package com.jbrewer.webapps.proflogs;

public class Profile {
	private String firstname = null;
	private String lastname = null;
	private String area = null;
	private String occupation = null;
	private String[] personalities = null;
	
	public Profile(String fName, String lName, String area, String occ, String[] pers){
		this.firstname = fName;
		this.lastname = lName;
		this.area = area;
		this.occupation = occ;
		this.personalities = pers;
	}
	public String getFirstname() {
		return firstname;
	}

	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}

	public String getLastname() {
		return lastname;
	}

	public void setLastname(String lastname) {
		this.lastname = lastname;
	}
	
	public String getArea(){
		return area;
	}
	
	public void setArea(String area){
		this.area = area;
	}
	
	public String getOccupation() {
		return occupation;
	}

	public void setOccupation(String occupation) {
		this.occupation = occupation;
	}
	
	public String[] getPersonalities() {
		return personalities;
	}

	public void setPersonalities(String[] personalities) {
		this.personalities = personalities;
	}
	
	public String toString() {

		StringBuffer sb = new StringBuffer();
		sb.append("\nFirst Name: " + getFirstname() + " ,");
		sb.append("\nLast Name: " + getLastname() + " ,");
		sb.append("\nArea: " + getArea() + " ,");
		sb.append("\nOccupation: " + getOccupation() + " ,");
		sb.append("\nPersonalities: ");
		for (int i = 0; personalities != null && i < personalities.length; i++) {
			sb.append(" " + personalities[i]);
			if(i < personalities.length-1){
				sb.append(" /");
			}
		}

		return sb.toString();

	}
	
}
