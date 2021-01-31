# birthdays-and-events-2
## Overview
This app takes employee's birthdays and special events from the holiday calendar and posts to a single channel in Slack.
To be scheduled daily via Heroku.



## TODO
- Pull in birthdays, work anniversaries, new starters, holidays, annual leave (who's out?)
- Configure daily message - birthdays, work anniversaries, new starters
- Configure weekly message - public holidays, who's out
- Build messaging helper
- Connect to Slack channel
- Build scheduler helper https://www.npmjs.com/package/node-schedule
- Handle timezones for birthdays/work anniversaries
- Build visual interface for turning on/off schedule
- Push to Heroku

- Edit link to Slack channel
- Set custom schedules
- 


## Structure
- main file
- Fetch helper
- BambooHR helper
- Message helper
- Slack helper
- Schedule helper




## Steps
```
git remote add origin https://github.com/jleeau/birthdays-and-events-2.git
git pull origin main
npm init
git commit -m "initialized npm"
git branch -m master main               // rename local master to main
git push --set-upstream origin main     // push to origin from a local branch called main

// Execute code
node app.js
```

## Deleting a branch from github
```
git push origin --delete master
```