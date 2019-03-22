# csc667-teamproject-team9

# Todo:

1. Change the name of the repo with the correct team number. Done

2. Invite all members to your repository. Done

3. When ready, initialize your repository with the initial state of your project.

# Git Basic Notes:

- Changes to your personal branch:
    - Your personal branch is defined as a branch that you work on where other group members will not be making changes
    - commit small to moderate changes consistently. If you make a change to the code that you have tested and verified to work, commit         this change with a short commit message describing the change you have made and then push it to the server.
    - Unless your working sessions are short if you have find yourself making one large commit per session you are doing it wrong.
    - Simplest process for making commits:
        git status                         -- this lets you see the changes you have made that have not been added to your commit
        git add <filename>                 -- this lets you add files to your commit ( using git add . lets you add all files that have                                                 not already been added)
        git commit -m "<commit message>"   -- this stores all your file changes you have added to your commit. You will replace <commit                                                 message> with a description of the changes you have made to the files you are uploading
        git push                           -- this pushes your changes from your personal git repository to the central repository.
  
  NOTE: if at any moment in this process you encounter an error of any sort DO NOT force push your changes to the server. Many errors             involve merge conflics between your changes and the code that exists on the repository. These should be looked through before your         code is pushed to the central respository 
  
- Changes to group branches
   - This section is to be filled in later

### Note that the milestone folders have been moved to their branch named milestones. 
### This is to keep them off the master/production branch so they are cleaner.
