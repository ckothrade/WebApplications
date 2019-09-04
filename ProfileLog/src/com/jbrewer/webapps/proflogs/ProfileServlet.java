package com.jbrewer.webapps.proflogs;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;

import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;

public class ProfileServlet extends HttpServlet{
	
	private static LogBook _plog = null;

	public void init(ServletConfig config) throws ServletException{
		super.init(config);
		
		String filename = config.getInitParameter("profiles");
		if (filename == null || filename.length() == 0) {
		    throw new ServletException();
		}
		
		InputStream is = this.getClass().getClassLoader().getResourceAsStream(filename);
		try{
			_plog = new LogBook(is);
		}catch(IOException ex){
			ex.printStackTrace();
			throw new ServletException(ex);
		}
	}
	
	public void doPost(HttpServletRequest req, HttpServletResponse res) 
			throws ServletException, IOException {
		
		res.setContentType("text/html");
		PrintWriter out= res.getWriter();
		out.println("<HTML><HEAD><TITLE>Profile Log Action Solution</TITLE></HEAD><BODY>");
		
		String action = req.getParameter("Action");
		if (action == null || action.length() == 0) {
		    out.println("Error, No Action Submitted");
		    out.println("</BODY></HTML>"); 
		    return;
		}
		
		try{
			
			if(action.equals("Add")){
				
				// Gather Parameters
				String firstname = req.getParameter("firstname");
				String lastname = req.getParameter("lastname");
				String area = req.getParameter("area");
				String occupation = req.getParameter("occupation");
				String[] traits = req.getParameterValues("personality");
				if(traits == null){
					traits = new String[]{""};
				}
				
				if(_plog.hasProfile(firstname+lastname)){
					out.println("<em>This user profile already exists...</em>");
				}else{
					// Create Profile
					Profile nProfile = new Profile(firstname, lastname, area, occupation, traits); 
				
					// Add to & save Profile Log
					_plog.saveProfile(firstname+lastname, nProfile);
					
					out.println("<em>The profile has been added to the log.</em>");
				}
				
			}else if(action.equals("Remove")){
				
				String firstname = req.getParameter("firstname");
				String lastname = req.getParameter("lastname");
		
				if(_plog.hasProfile(firstname+lastname)){
					_plog.removeProfile(firstname+lastname);
					out.println("<em>The user profile has been removed</em>");
				}else{
					out.println("<em>Failure with attempt to remove profile...</em>");
				}
				
			}else if(action.equals("List")){
				
				String[] profiles = _plog.listProfiles();
				for(int i = 0; i < profiles.length; i++)
					out.println(profiles[i] + "<br>");
				
			}else{
				out.println("<em>No valid Action provided in the parameters</em>");
			}
			
		}catch(Exception ex){
			out.println("<p>Error Processing Action Request</p>");
			ex.printStackTrace();
		}
		out.println("</BODY></HTML>");
	}
	
	public void doGet(HttpServletRequest req, HttpServletResponse res) 
			throws ServletException, IOException {
		res.sendError(HttpServletResponse.SC_NOT_IMPLEMENTED, "GET METHOD not supported by this servlet");
	}
}
