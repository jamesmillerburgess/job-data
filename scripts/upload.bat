
mongoimport --host cluster0-shard-00-00-rdywu.mongodb.net:27017,cluster0-shard-00-01-rdywu.mongodb.net:27017,cluster0-shard-00-02-rdywu.mongodb.net:27017 --authenticationDatabase admin --db jobs --ssl --username admin --password Cdjuices1 --collection companies --type csv --drop --file ../data/COMPANIES.csv --headerline
mongoimport --host cluster0-shard-00-00-rdywu.mongodb.net:27017,cluster0-shard-00-01-rdywu.mongodb.net:27017,cluster0-shard-00-02-rdywu.mongodb.net:27017 --authenticationDatabase admin --db jobs --ssl --username admin --password Cdjuices1 --collection rawJobs --type csv --drop --file ../data/JOBS-2017-JULY-W1.csv --headerline
mongoimport --host cluster0-shard-00-00-rdywu.mongodb.net:27017,cluster0-shard-00-01-rdywu.mongodb.net:27017,cluster0-shard-00-02-rdywu.mongodb.net:27017 --authenticationDatabase admin --db jobs --ssl --username admin --password Cdjuices1 --collection rawJobs --type csv --file ../data/JOBS-2017-JULY-W2.csv --headerline
mongoimport --host cluster0-shard-00-00-rdywu.mongodb.net:27017,cluster0-shard-00-01-rdywu.mongodb.net:27017,cluster0-shard-00-02-rdywu.mongodb.net:27017 --authenticationDatabase admin --db jobs --ssl --username admin --password Cdjuices1 --collection rawJobs --type csv --file ../data/JOBS-2017-JULY-W3.csv --headerline
mongoimport --host cluster0-shard-00-00-rdywu.mongodb.net:27017,cluster0-shard-00-01-rdywu.mongodb.net:27017,cluster0-shard-00-02-rdywu.mongodb.net:27017 --authenticationDatabase admin --db jobs --ssl --username admin --password Cdjuices1 --collection rawJobs --type csv --file ../data/JOBS-2017-JULY-W4.csv --headerline
mongoimport --host cluster0-shard-00-00-rdywu.mongodb.net:27017,cluster0-shard-00-01-rdywu.mongodb.net:27017,cluster0-shard-00-02-rdywu.mongodb.net:27017 --authenticationDatabase admin --db jobs --ssl --username admin --password Cdjuices1 --collection rawJobs --type csv --file ../data/JOBS-2017-JULY-W5.csv --headerline