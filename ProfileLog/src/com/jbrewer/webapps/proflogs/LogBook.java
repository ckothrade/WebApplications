package com.jbrewer.webapps.proflogs;

import java.io.*;
import java.util.*;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

public class LogBook {
	public static final String DEFAULT_FILENAME = "profiles.xml";

	private Map<String, Profile> _plog = new HashMap<String, Profile>();

	public LogBook() throws IOException {
		this(DEFAULT_FILENAME); 
	}
	public LogBook(String fname) throws IOException {
		this(LogBook.class.getClassLoader().getResourceAsStream(fname));
	}
	public LogBook(InputStream is) throws IOException {
		//this(new BufferedReader(new InputStreamReader(is)));
		DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
		
		try{
			DocumentBuilder dBuilder = dbFactory.newDocumentBuilder();
			Document doc = dBuilder.parse(is);
			Element element = doc.getDocumentElement();
			
			// Retrieve elements
			NodeList profileList = doc.getElementsByTagName("person");
			for(int i = 0; i<profileList.getLength(); i++){	
				
				// Grab Person nodes
				Node personNode = profileList.item(i);
				if(personNode.getNodeType()== Node.ELEMENT_NODE){
					// Cast node to an element
					Element person = (Element) personNode; 
					// Retrieve Person's variables
					NodeList traitList = person.getChildNodes();
					// Send traitList to create People
					//pTemp.add(createPerson(traitList));
					createProfile(traitList);
				} // end of loop for each person		
		
			}
		
		}catch (Exception e){
	    	e.printStackTrace();
	    }
		
	}
	
	public void createProfile(NodeList traitList){
		String firstname = null;
		String lastname = null;
		String area = null;
		String occupation = null;
		String[] personalities = null;
		ArrayList<String> temp = new ArrayList<String>();
		
		for(int j = 0; j < traitList.getLength(); j++){
			Node traitNode = traitList.item(j);
			
			if(traitNode.getNodeType()== Node.ELEMENT_NODE){
				Element trait = (Element) traitNode;
				//Element description;
				
				// Apply to temp variables
				if(trait.getNodeName().equals("firstname")){
					firstname = trait.getTextContent();
				}
				if(trait.getNodeName().equals("lastname")){
					lastname = trait.getTextContent();
				}
				if(trait.getNodeName().equals("area")){
					area = trait.getTextContent();
				}
				if(trait.getNodeName().equals("occupation")){
					occupation = trait.getTextContent();
				}
				
				// Grab personality tags
				if(trait.getNodeName().equals("personalities")){
					// Create nodelist of individual personalities
					NodeList nList = trait.getChildNodes();
					for(int k = 0; k < nList.getLength(); k++){
						Node nNode = nList.item(k);
						if(nNode.getNodeType()== Node.ELEMENT_NODE){
							Element personality = (Element) nNode;
							// Add personality to arrayList
							temp.add(personality.getTextContent()); 
						}
					}		
					// Convert arrList to array
					personalities = temp.toArray(new String[temp.size()]); 
				}
				//reset arrList
				temp.clear();
			} // end of loop for each inner node	
		}
		_plog.put(firstname+lastname, new Profile(firstname, lastname, area, occupation, personalities));
	}
	
	public boolean hasProfile(String name){
		return _plog.containsKey(name);
	}
	
	public String[] listProfiles(){
		String[] ret = new String[_plog.size()];
		int i = 0;
		Profile nextProfile = null;
		for (Iterator<Profile> iter = _plog.values().iterator(); iter.hasNext();) {
			nextProfile = iter.next();
			ret[i++] = nextProfile.toString();
		}
		return ret;
	}
	
	public void saveProfile(String name, Profile nProfile){
		
		// Add profile to active map
		_plog.put(name, nProfile);
		
		DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
		File currFile = new File(getClass().getClassLoader().getResource(DEFAULT_FILENAME).getFile());
		
		try{
			InputStream is = this.getClass().getClassLoader().getResourceAsStream(DEFAULT_FILENAME);
			DocumentBuilder dBuilder = dbFactory.newDocumentBuilder();
			Document doc = dBuilder.parse(is);
			
			Element root = doc.getDocumentElement();
			Element newPerson = doc.createElement("person");
			
			// firstname
			Element firstname = doc.createElement("firstname");
			firstname.appendChild(doc.createTextNode(nProfile.getFirstname()));
			newPerson.appendChild(firstname);
			
			// lastname
			Element lastname = doc.createElement("lastname");
			lastname.appendChild(doc.createTextNode(nProfile.getLastname()));
			newPerson.appendChild(lastname);
			
			// area
			Element area = doc.createElement("area");
			area.appendChild(doc.createTextNode(nProfile.getArea()));
			newPerson.appendChild(area);
			
			// occupation
			Element occupation = doc.createElement("occupation");
			occupation.appendChild(doc.createTextNode(nProfile.getOccupation()));
			newPerson.appendChild(occupation);
			
			// personalities
			Element personalities = doc.createElement("personalities");
			String[] traits = nProfile.getPersonalities();
			for(int i = 0; i < traits.length; i++){
				// each language
				Element personality = doc.createElement("personality");
				personality.appendChild(doc.createTextNode(traits[i]));
				personalities.appendChild(personality);
			}
			newPerson.appendChild(personalities);
			
			root.appendChild(newPerson);
				
			TransformerFactory transformerFactory = TransformerFactory.newInstance();
			Transformer transformer = transformerFactory.newTransformer();
			DOMSource source = new DOMSource(doc);
			
			StreamResult result = new StreamResult(currFile);
			transformer.transform(source, result);
			
	    }catch (Exception e){
			e.printStackTrace();
		}
		
	}
	
	public void removeProfile(String name){
		// remove from map
		_plog.remove(name);
		
		// Remove element from file
		DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
		File currFile = new File(getClass().getClassLoader().getResource(DEFAULT_FILENAME).getFile());
		
		try{
			
			InputStream is = this.getClass().getClassLoader().getResourceAsStream(DEFAULT_FILENAME);
			DocumentBuilder dBuilder = dbFactory.newDocumentBuilder();
			Document doc = dBuilder.parse(is);
			
			Element root = doc.getDocumentElement();
			
			NodeList nList = root.getChildNodes();
			int length = nList.getLength();
			for(int i = 0; i < length; i++){
				if(nList.item(i).getNodeType() == Node.ELEMENT_NODE){
					Element el = (Element) nList.item(i);
					if(el.getNodeName().equals("person")){
						String fname = el.getElementsByTagName("firstname").item(0).getTextContent();
						String lname = el.getElementsByTagName("lastname").item(0).getTextContent();
						String id = fname+lname;
						if(id.equals(name)){
							// remove element
							Node parent = el.getParentNode();
							parent.removeChild(el);
							parent.normalize();
							break; 
						}
					}
				}
			}
			
			TransformerFactory transformerFactory = TransformerFactory.newInstance();
			Transformer transformer = transformerFactory.newTransformer();
			DOMSource source = new DOMSource(doc);
			
			StreamResult result = new StreamResult(currFile);
			transformer.transform(source, result);
			
		}catch(Exception e){
			e.printStackTrace();
		}
	}
	
}
