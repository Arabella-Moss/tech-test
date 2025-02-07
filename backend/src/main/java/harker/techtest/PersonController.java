package harker.techtest;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
public class PersonController {

    @Autowired
    private PersonService personService;

    // Change these to be the URL paths you want
    private final String getPath = "people"; 
    private final String postPath = "people";
    private final String putpath = "/people{id}"


    // retrieves list of all people from database
    @GetMapping(getPath)
    public List<Person> getPeople() {
        return personService.getAllPeople();
    }

 
    // retrieves list of a specific person using unique ID
    @GetMapping(getPath + "/{id}")
    public Person getPerson(@PathVariable("id") String id) {
        return personService.getPerson(id);
    }


    // creates a new person in database 
    @PostMapping(postPath)
    public Person postPerson(@RequestBody Person personModel) {
        return personService.postPerson(personModel);
    }

    // Task 3, updates details of an existing person identified by their ID
    @PutMapping(putPath)
    public person updatePerson(@PathVariable("id") String id, @RequestBody Person personMode1) {
        return personService.updatePerson(id, personMode1);
    }

    
}