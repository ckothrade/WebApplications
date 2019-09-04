Author: Cal Kothrade 
Version: 09/04/2019  

*Description: A quick java servlet run form a tomcat server to demonstrate reading and writing 
from an xml file. Alternatively, with slight modifications it could be used to work with other file 
extensions such as .txt files. Basic operations include adding/removing profiles and listing profiles.

*Instructions: 

1. Download Folder
2. Add local Tomcat pathway to your tomcat.home property in the build.properties file
3. Change any other pertinent properties
4. Inspect build targets in build.xml file to ensure it complies with how your directories
	are set up. (May need to remove $Port attribute/property)
5. Run "ant build" command from root directory
6. Run "ant deploy" command from root directory
7. War file should now be deployed to your local tomcat/webapps directory
8. Start your tomcat server and app can be found at url extension /ProfileLog/