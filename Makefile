deploy-development: 
	tar cvf build.tgz build
	scp -i ~/.ssh/fiona_catback/catback.pem build.tgz scripts/deploy.sh ubuntu@13.250.25.137:/home/ubuntu/
	ssh -i ~/.ssh/fiona_catback/catback.pem ubuntu@13.250.25.137 'bash ~/deploy.sh'
	rm build.tgz