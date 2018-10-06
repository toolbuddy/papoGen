# Contributing

Thanks for contributing *papoGen*. The following steps are show how to contribute to *papoGen*. Please read the following content before contributing. Thanks for your cooperation.

## Pull requests

1. Fork this repository and clone the repository you forked.
    ```bash
    # Clone your fork of the repo into the current directory
    git clone https://github.com/<your-username>/papogen
    # Navigate to the newly cloned directory
    cd <repo-name>
    ```
2. Create new branch named `develop` and switch to this branch
    ```bash
    # Create a new branch named develop
    $ git branch develop
    # Switch to branch named develop
    $ git checkout develop
    ```
3. Assign the original repository to a remote called `upstream` and update
    ```bash
    # Assign the original repo to a remote called "upstream"
    $ git remote add upstream https://github.com/toolbuddy/papogen
    # Update to remote repository
    $ git remote update
    ```
4. Pull the latest version from our repository and merge to your branch
    ```bash
    # Pull the latest version from our repository
    $ git fetch upstream master
    # Merge our latest version to your branch
    $ git rebase upstream/master
    ```