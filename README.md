## Developers

- clone project
- install npm packages defined in package.json `npm install`
- create configuration file based on example in config/example/custom_constants.txt and put it in config/custom_constants.txt
- run scc to generate files based on templates `php tasks/scc/scc.php config/custom_constants.txt`
- start node server using forever `./tasks/start-server`
- watch files and reload when making changes `grunt watch`
- monitor the server log files `tail -f log/app.log -f log/app-err.log`
