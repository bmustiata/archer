project-archer
==============

A suite of sweet scripts to make project development and deployment a breeze.

## Install

In order to install this run:

```sh
npm install -g project-archer
```

## Usage

```
project [--new] [--list] name?
server  [--new] [--list] name?
runtime [--new] [--list] name?
```

Then after you set your combination of project/server/runtime, you can run
the commands that are defined for a project, a server or a runtime, such as:

* project
    a. build
    b. clean
    c. rebuild
* server
    a. cdl
    b. cdw
    c. cdb
    d. cds
* runtime

Switching a deployment target becomes as easy as setting:
```
username(SomeWebApp>JBoss_6:Java_8)$ project --settings
Project: SomeWebApp
Server : JBoss_6 (running)
Runtime: Java_8

username(SomeWebApp>JBoss_6:Java_8)$ serverstop
Project: SomeWebApp
Server : JBoss_6 (stopped)
Runtime: Java_8

username(SomeWebApp>JBoss_6:Java_8)$ server Tomcat_7
Project: SomeWebApp
Server : Tomcat_7 (stopped)
Runtime: Java_8

username(SomeWebApp>JBoss_6:Java_8)$ redeploy
username(SomeWebApp>JBoss_6:Java_8)$ serverstart
Project: SomeWebApp
Server : Tomcat_7 (running)
Runtime: Java_8
```

