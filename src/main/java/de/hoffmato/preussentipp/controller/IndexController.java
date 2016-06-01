package de.hoffmato.preussentipp.controller;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class IndexController {

    @RequestMapping(value = { "/", "/home" }, method = RequestMethod.GET)
    public String index(Model model) {
        model.addAttribute("recipient", "World");
        //return "index.html";
        return "index.html";
    }
    
//    @RequestMapping(value = "/admin", method = RequestMethod.GET)
//    public String adminPage(ModelMap model) {
//        model.addAttribute("user", getPrincipal());
//        return "admin.html";
//    }
// 
//    @RequestMapping(value = "/db", method = RequestMethod.GET)
//    public String dbaPage(ModelMap model) {
//        model.addAttribute("user", getPrincipal());
//        return "dba.html";
//    }
//    
//    @RequestMapping(value = "/snoop", method = RequestMethod.GET)
//    public String snoop(Model model) {
//        model.addAttribute("recipient", "World");
//        //return "index.html";
//        System.out.println("BLLLLLL");
//        return "snoop.jsp";
//    }
//    
//    @RequestMapping(value = "/Access_Denied", method = RequestMethod.GET)
//    public String accesDenied(Model model) {
//        return "access-denied.html";
//    }
//    
//    private String getPrincipal(){
//        String userName = null;
//        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
// 
//        if (principal instanceof UserDetails) {
//            userName = ((UserDetails)principal).getUsername();
//        } else {
//            userName = principal.toString();
//        }
//        return userName;
//    }
    
}