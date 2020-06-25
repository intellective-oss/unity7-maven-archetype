![master](https://github.com/intellective-oss/unity7-maven-archetype/workflows/Build/badge.svg)

# Unity 7 Maven Archetype
Maven Archetype for creating projects based on Unity 7

## Creating a project
On Windows (cmd.exe):
```
mvn archetype:generate "-DarchetypeGroupId=com.intellective.archetypes" ^
                       "-DarchetypeArtifactId=unity7-maven-archetype" ^
                       "-DarchetypeVersion=1.0.1" ^
                       "-DgroupId=com.intellective.sample" ^
                       "-DartifactId=unity7-custom-app" ^
                       "-Dversion=1.0.0-SNAPSHOT" ^
                       "-DunityVersion=7.7.0-RC4"
```
On Linux or MacOS:
```
mvn archetype:generate -DarchetypeGroupId=com.intellective.archetypes \
                       -DarchetypeArtifactId=unity7-maven-archetype \
                       -DarchetypeVersion=1.0.1 \
                       -DgroupId=com.intellective.sample \
                       -DartifactId=unity7-custom-app \
                       -Dversion=1.0.0-SNAPSHOT \
                       -DunityVersion=7.7.0-RC4
```

## System requirements
You should have the following software installed to build this application:
* Java 8 (OpenJDK, or any OpenJDK-compliant JDK works fine)
* [Apache Maven](https://maven.apache.org) 3.6.0 or newer
* [Optional] Java IDE of your choice: IntelliJ IDEA, Visual Studio Code, Eclipse, etc.
* [Optional] [Docker runtime](https://www.docker.com) 

## Authorization
To build an application you require a token for Maven repository and, optionally, a login/password pair for container
registry.
To get them you can contact your **Intellective** representative or send an e-mail to 
[info@intellective.com](mailto:info@intellective.com).

#### Maven
Create or edit your `~/.m2/settings.xml` file to have the following server section:
```
<settings xmlns="http://maven.apache.org/SETTINGS/1.0.0"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0
    https://maven.apache.org/xsd/settings-1.0.0.xsd">
  <servers>
     <!-- ... -->
     <server>
        <id>intellective-maven</id>
        <configuration>
        <httpHeaders>
          <property>
            <name>Private-Token</name>
            <value>[YOUR_TOKEN]</value>
          </property>
        </httpHeaders>
        </configuration>
     </server>
     <!-- ... -->
</settings>
```
### Container registry
It is optional step unless you plan to build a Docker image of your application.
Use the following command to log into Intellective's container registry to gain access to Unity docker images:
```
docker login docker.devops.intellectivelab.com
```

## Project structure
Current project template contains the following set of modules:
* `custom-webapp` - target web application module; it absorbs other modules and builds a WAR file
* `custom-services` - server-side code, usually uses Spring MVC to implement an API and underlying back-end
* `custom-i18n` - internationalization resources for the application
* `custom-config` - contains application configuration files
* `custom-docker` - builds customized Docker image.

During the development of your application you are free to rename, re-arrange, 
and/or modify it accordingly to your specific design.
However, it defines effective minimal viable model for the custom project. It does make sense to keep it standardized 
unless there're explicit requirements to change it.

## Building the application
Use the following Maven command or perform corresponding action in the IDE of your choice:
```
mvn package
```
Or if you want to build a Docker image, use corresponding profile:
```
mvn package -P docker
```
To build you app in Web Development mode (no obfuscation/minimization) use `web-dev-mode` profile:
```
mvn package -P web-dev-mode
```
or for Docker:
```
mvn package -P web-dev-mode,docker
```

## Running on OpenLiberty
Current application template works on [OpenLiberty](https://openliberty.io) 
or [IBM WebSphere Liberty](https://www.ibm.com/cloud/websphere-liberty) application server.
However, it can be easily adopted to any Java/Jakarta EE 6 compliant application server.

You can use `custom-config/src/main/resources/liberty/server.xml` as a reference or even use it
into your local or centralized (CI/CD) development procedure.

## Running on Docker
By default, the Docker image contains all neccesary configurations from the `custom-config` module.
So you can run the container with minimal configuration:
```
docker run --rm -p 9080:9080 unity/custom-app:latest
``` 

## Licensing
Unity 7 Maven Archetype licensed under Apache 2.0 license.

However, the project you're going to build depends on proprietary software such as Unity,
owned by [Intellective](https://www.intellective.com) company,
Sencha ExtJS and some other third-party components (bundled with Unity).

If you have any questions about copyright and licensing, [feel free to contact Intellective](https://www.intellective.com/contact-us/).
