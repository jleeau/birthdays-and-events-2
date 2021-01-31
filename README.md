# birthdays-and-events-2

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