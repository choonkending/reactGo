# Deploy to AWS EC2 with Linux AMI

Interested in learning how to deploy our app to AWS EC2 with Linux AMI? Read on! Beware though, there's going to be a whole lot of :information_source: bits throughout - I wrote this doc not knowing anything about AWS. 

**:information_source: AMI**

An Amazon Machine Image (AMI) provides the information required to launch an instance, which is a virtual server in the cloud. You specify an AMI when you launch an instance, and you can launch as many instances from the AMI as you need.

The Amazon Linux AMI is a supported and maintained Linux image provided by AWS for use on AWS EC2. It is designed to provide a stable, secure, and high performance execution environment running on Amazon EC2. We decided to try the Amazon Linux AMI because it:
- supports the latest EC2 type features
- includes packages that easily integrate with AWS
- provides security and maintainance updates by AWS

**:information_source: EC2**

Amazon Elastic Compute Cloud (EC2) is a web service which provides resizable compute capacity in the cloud. It is designed to make web-scale cloud computing easier for developers. EC2 instances are located within a Virtual Private Cloud (VPC) that is a logically isolated network you control. Amazon VPC provides you with a number of network security tools you can use to control who can access your instances.

# Instructions

## Sign Up

The first thing you will need to do is sign up for an [account](https://aws.amazon.com/free/) - 🔒 remember to set up [multi factor authentication](https://aws.amazon.com/iam/details/mfa/) for increased security in your AWS environments! 

## Create an IAM User

:information_source: IAM - Identity and Access Management

🔒 Lock away your AWS account (root) access keys because they provide **_unrestricted_** access to your AWS resources. Create the IAM user with administrative permissions instead! All future interactions should be through the AWS account's users and their own keys instead of the root user.

1. Create an IAM user
  - Select **AWS Management Console access - with a password**
2. Add the user to an IAM group with administrative permissions/grant this user administrative permissions.
  - Give your group a name
  - Select **AdministratorAccess** (or a relevant group)
3. :tada: Have some wine - You can now access AWS using a special URL and the credentials for the IAM user!

Read more about IAM best practices [here](http://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html).

## Create a Key Pair

A Linux instance - incidentally the instance we will be launching in EC2 - on AWS has no password. We will need to create a key pair in order to log in to our instance securely!

1. Sign in to AWS with the created IAM user's link
2. Go to the Amazon EC2 Console
3. Ensure you are in the right region - e.g. Asia Pacific (Sydney)
4. Under **Network & Security** > KeyPairs
5. Create Key Pair > Pick a name that's easy to remember
6. Save it in a safe place
  - Modify the permissions of the file so that only you can read it 
```bash
chmod 400 your_file.pem
```

## Create a VPC

:information_source: A _virtual private cloud_ (VPC) is a virtual network dedicated to your AWS account. It is logically isolated from other virtual networks in the AWS cloud. You can launch AWS resources (e.g. EC2 instances) into your VPC and configure your VPC by selecting it's IP address range, create subnets, configure route tables, network gateways and security settings.

:warning: If you already have a default VPC, you can skip to the next section. 

1. Go to VPC in your dashboard
2. Select a region - remember to select the same region in which you created your Key Pair
3. **Start VPC Wizard** 
 - Select **VPC with a Single Public Subnet** 
 - Enter a friendly **VPC Name** (leave other default settings) 
 - Create VPC


:information_source: A _subnet_ is a range of IP addresses in your VPC. Use a **public subnet** for resources that must be connected to the internet, and a **private subnet** for resources that won't be connected to the internet. 

## Create a Security Group

:information_source: A _security group_ acts as a firewall for associated instances, controlling inbound and outbound traffic at an instance level.

Before you initialize a new instance you will need to set up a security group. This security group will just open the ports you need for development. Once you go to production you should SERIOUSLY consider a more locked down security group.

1. Go to the Amazon EC2 Console
2. Select a region - remember to select the same region in which you created your Key Pair
3. Click **Security Groups** in the Navigation Pane
4. Click **Create Security Group**
 - Pick a name + description
 - Select a VPC
 - Add inbound rules
 - Create
5. Enjoy the brief feeling of security before you get told off by your ops team members.

This is what a basic security group should look like. The 2 custom ports are for the port we are running on in development and the default mongoDB port. If you are running on different ports replace these as needed.

```
  TYPE          PROTOCOL    PORT RANGE    SOURCE
  HTTP            TCP           80       0.0.0.0/0
  SSH             TCP           22       <your IP address/32>
  HTTPS           TCP           443      0.0.0.0/0
Custom TCP Rule   TCP           3000     0.0.0.0/0
Custom TCP Rule   TCP           27017    0.0.0.0/0
```

🔒 Amazon doesn't recommend that you allow SSH access from all IP addresses (0.0.0.0/0) to your instance, except for testing purposes and only for a short time! Lock that puppy down :dog:

To specify an individual IP address in CIDR notation, add the routing suffix /32 to your IP address. You can check your public IP address in [http://checkip.amazonaws.com/](http://checkip.amazonaws.com/).

## Create an EC2 instance

Now it is time to create an instance. Make sure you are in the correct region - the drop down is at the top-corner of the navigation bar! This should be the region that is closet to your geographic location.

You ready?

1. Select **Launch Instance**
2. Pick **Amazon Linux AMI** (it is free tier eligible)
3. Follow through the steps, but the defaults should all suffice. 
4. Tag your project with a name and then apply the security group you created earlier, review and launch.

The last step will be to create or use an existing key pair - we will use the key pair we created earlier.

After a couple of minutes your instance will be ready, and visible under the running instances. Given that we created a nondefault VPC, we are not allocated a public IP by default. Don't worry, we'll be addressing that next!

## Create and Associate Elastic IP

:information_source: An _Elastic IP address_ is a static IP address designed for dynamic cloud computing. An Elastic IP address is associated with your AWS account. It is a public IP address, which is reachable from the internet.

1. In your EC2 console, select **Network & Security > Elastic IPs**
2. **Allocate New Address** > **Yes, Allocate**

Now that we have an Elastic IP, let's associate it with a running instance:

1. Still under **Network & Security > Elastic IPs**, ensure the Elastic IP you've created is checked
2. **Actions > Associate Address**
3. Type in the instance ID or name tag of your EC2 instance


#### CONNECTING

There are explicit instruction if you click the connect button on the instances page of the EC2 dashboard. But in your terminal you will need to type something that looks like this.

`ssh -i "node.pem" ubuntu@ec2-##-#-###-###.compute-1.amazonaws.com`

Now that you are connected you are on the server. And the server is clean so we need to install some things.

#### INSTALLING SOFTWARE

First install [node](https://nodejs.org/en/download/package-manager/)
then [mongoDB](https://docs.mongodb.com/v3.0/tutorial/install-mongodb-on-ubuntu/)
Both of these have multiple versions so make sure you follow the instructions for Ubuntu 14.04.

If you want to start mongo temporarily you would use this command
`sudo /usr/bin/mongod --dbpath /home/ubuntu/db/data`
to keep if running forever you will need this command
`sudo /usr/bin/mongod --dbpath /home/ubuntu/db/data --fork --logpath /var/log/mongodb.log`

#### UPLOADING YOUR FILE

Now we will start uploading our files using [secure copy](https://en.wikipedia.org/wiki/Secure_copy)

`scp -i KEYFILE.pem -r SOURCE ubuntu@ec2-##-##-##-###.compute-1.amazonaws.com:DEST`

The KEYFILE is the same one you created and saved someplace safe earlier. The SOURCE is File containing everything you want to upload and DEST is the folder on the server you want to copy it into.

I highly suggest that you do no use this method to copy over your dependencies, it is a much better plan to install those once you have uploaded your files.

#### RUNNING THE PROJECT

Now that your files and dependencies are on the server a simple `npm start` will get you going. But it wont keep you going. Once you close your SSH connection your site will go down.

##### KEEPING IT RUNNING

To remedy this will will use [forever](https://www.npmjs.com/package/forever). We will need to install it globally `sudo npm install forever -g` and then add another script to our package.js. Just a modified version of the start stript. `"stayAlive": "cross-env NODE_ENV=production forever start compiled/index.js",`

#### REMOVING THE PORT

The simplest way to remove the port would be user IP Tables. Running `sudo iptables -t nat -I PREROUTING -p tcp --dport 80 -j REDIRECT --to-port 3000` This solution is fine if you are just building a small side project and want a clean url, but don't care that much about security.

A more production ready solution would be to use [NginX](https://www.nginx.com/resources/wiki/) and use the reverse proxy to allow the project to run on its own port, while the users access the using port 80. A simple tutorial can be found [here](https://eladnava.com/binding-nodejs-port-80-using-nginx/). NginX has the added benefits of being able to blocking ip's, detect some web attacks and  protecting your application.

### References

1. [Setting Up with Amazon EC2](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/get-set-up-for-amazon-ec2.html)
2. [IAM Best Practices](http://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html)
3. [What is Amazon VPC](http://docs.aws.amazon.com/AmazonVPC/latest/UserGuide/VPC_Introduction.html)
4. [Getting Started with Amazon EC2 Linux Instances](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EC2_GetStarted.html)
5. [Amazon Machine Images](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AMIs.html)
6. [Elastic IP Addresses](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/elastic-ip-addresses-eip.html#using-instance-addressing-eips-associating)
