provider "aws" {
  region = "us-east-1"
}

resource "aws_vpc" "this" {
  cidr_block = "10.0.0.0/16"

  tags = {
    Name = "app-vpc"
  }
}

resource "aws_subnet" "public" {
  count = 2

  cidr_block = "10.0.${count.index + 1}.0/24"
  vpc_id     = aws_vpc.this.id

  tags = {
    Name = "app-public-subnet-${count.index + 1}"
  }
}

resource "aws_security_group" "allow_http" {
  name        = "allow_http"
  description = "Allow HTTP traffic"
  vpc_id      = aws_vpc.this.id

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_security_group" "allow_redis" {
  name        = "allow_redis"
  description = "Allow Redis traffic"
  vpc_id      = aws_vpc.this.id

  ingress {
    from_port   = 6379
    to_port     = 6379
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

resource "aws_lb" "this" {
  name               = "app-lb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.allow_http.id]
  subnets            = aws_subnet.public.*.id
}

resource "aws_lb_target_group" "this" {
  name     = "app-target-group"
  port     = 80
  protocol = "HTTP"
  vpc_id   = aws_vpc.this.id
}

resource "aws_lb_listener" "this" {
  load_balancer_arn = aws_lb.this.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.this.arn
  }
}

resource "aws_launch_configuration" "this" {
  name_prefix          = "app-launch-configuration"
  image_id             = "ami-0c55b159cbfafe1f0" # Amazon Linux 2 LTS
  instance_type        = "t2.micro"
  security_groups      = [aws_security_group.allow_http.id]
  associate_public_ip_address = true

  user_data = <<-EOF
              #!/bin/bash
              yum install -y httpd
              echo "Hello, world!" > /var/www/html/index.html
              systemctl start httpd
              systemctl enable httpd
              EOF

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_autoscaling_group" "this" {
  name_prefix          = "app-autoscaling-group"
  max_size             = 8
  min_size             = 2
  desired_capacity     = 2
  vpc_zone_identifier  = aws_subnet.public.*.id
  launch_configuration = aws_launch_configuration.this.name

  target_group_arns = [aws_lb_target_group.this.arn]

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_elasticache_subnet_group" "this" {
  name = "app-elasticache-subnet-group"
  subnet_ids = aws_subnet.public.*.id
}

resource "aws_elasticache_cluster" "this" {
  cluster_id = "app-redis-cluster"
  engine = "redis"
  node_type = "cache.t2.micro"
  num_cache_nodes = 1
  parameter_group_name = "default.redis6.x"
  engine_version = "6.x"
  port = 6379
  subnet_group_name = aws_elasticache_subnet_group.this.name
  security_group_ids = [aws_security_group.allow_redis.id]
}
