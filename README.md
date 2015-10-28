project-archer
==============

A suite of sweet scripts to make project development and deployment a breeze.

## Install

In order to install this run:

```sh
npm install -g project-archer
```

## Usage

In your `.bashrc` you can register the commands for different setups that you want to use,
e.g. `project`, or `server`. It should be a noun in singular.

From the set of configurations a single configuration can be active. Configurations can export
variables, or commands, and have activation and deactivation scripts.

Here is for example a setup to allow easy changing of JDK environments:

```shell
eval $(project-archer jdk)
```

This will define the `jdk` command that will allow me to create, or edit configurations.
Then I create a new jdk configuration:

```
jdk -n 7
```

This will open the current `$EDITOR` with the `~/.archer/jdks/7.yml` file.

In it I will have:

```yml
config:
    name: Oracle JDK 7
    layouts: jdk
    exports:
        JAVA_HOME: /home/raptor/programs/jdk1.7.0_75
```

As you can see the configuration is using the layout `jdk`. This is created using:

```
jdk --layout -n jdk
```
In it there is:

```yml
layout:
    requires: JAVA_HOME
    activate:
        export JDK_OLD_PATH_SAVED="$PATH"
        export PATH="$JAVA_HOME/bin:$PATH"
    deactivate:
        export PATH="$JDK_OLD_PATH_SAVED"
        unset JDK_OLD_PATH_SAVED
```

Adding a new JDK version is as simple as:

```
jdk -n 8
```

Then switching JDK runtimes becomes trivial:

```
$ jdk 7
Commands: 
Activated jdk: Oracle JDK 7
$ java -version
java version "1.7.0_75"
Java(TM) SE Runtime Environment (build 1.7.0_75-b13)
Java HotSpot(TM) 64-Bit Server VM (build 24.75-b04, mixed mode)
$ jdk 8
Commands: 
Activated jdk: Oracle JDK 8
$ java -version
java version "1.8.0_60"
Java(TM) SE Runtime Environment (build 1.8.0_60-b27)
Java HotSpot(TM) 64-Bit Server VM (build 25.60-b23, mixed mode)
```

## ChangeLog

* 2015-10-28  v0.1.1  List the available configurations on empty runs.
* 2015-10-28  v0.1.0  Initial release.
