# Configuration

## Project

Here is the project configuration:

```yaml
project:
    name: "Display Name of the Project",
    export:
        PROJECT_HOME="/foo/.."
    path:|
        /home/raptor/programs/apache-maven-3.2.1/bin/
    onactivate:|
        ls -la
    ondeactivate:|
        pwd
    commands:
        cdproj: cd $PROJECT_HOME
        build:|
            CURRENT_DIR=`pwd`
            cd $PROJECT_HOME
            mvn install $@
            cd $CURRENT_DIR
            unset CURRENT_DIR
        clean:|
            CURRENT_DIR=`pwd`
            cd $PROJECT_HOME
            mvn clean $@
            cd $CURRENT_DIR
            unset CURRENT_DIR
        rebuild:|
            clean && build
```

Of course this is tedious to write for every single project.
So a better approach is to have project layouts. Assume this
`maven_project` layout:

```yaml
project:
    // describe what environment variables are needed.
    // In case a project refers to this layout, but doesn't exports
    // the variables, an error will be thrown
    needs:|
        PROJECT_HOME
    path:|
        /home/raptor/programs/apache-maven-3.2.1/bin/
    commands:
        cdproj: cd $PROJECT_HOME
        build:|
            CURRENT_DIR=`pwd`
            cd $PROJECT_HOME
            mvn install $@
            cd $CURRENT_DIR
            unset CURRENT_DIR
        clean:|
            CURRENT_DIR=`pwd`
            cd $PROJECT_HOME
            mvn clean $@
            cd $CURRENT_DIR
            unset CURRENT_DIR
        rebuild:|
            clean && build
```

Then a project can actually reffer to this layout, and only export the changes.

```yaml
project:
    name: "Display Name"
    layout: maven_project
    export:|
        PROJECT_HOME=/foo/
```

