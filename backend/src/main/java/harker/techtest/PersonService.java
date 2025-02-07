package harker.techtest;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PersonService {

    @Autowired
    private PersonRepository personRepository;

    // retrieves all person records from database
    public List<Person> getAllPeople() {
        List<Person> people = new ArrayList<>(); // creates a new empty list to store the records
        personRepository.findAll().forEach(people::add); // fetches records, adds each person to new list 
        return people; //returns list of people
    }

        // method to fetch specific person based on their ID, if not throw error message
    public Person getPerson(String id) {
        return personRepository.findById(id).orElseThrow(() -> new RuntimeException("Value not present"));
    }

    // method to save a new person to the database 
    public Person postPerson(Person person) {
        return personRepository.save(person);
    }
    
     // method to update an existing person's details
     public Person updatePerson(String id, Person person) {
        // check if the person exists in the database, if not throw an error message
        Person existingPerson = personRepository.findById(id).orElseThrow(() -> new RuntimeException("Person not found with id: " + id));

        // updates details of existing person in database
        existingPerson.setFirstName(person.getFirstName()); // takes first name from person object, sets it as first name of existingperson object
        existingPerson.setLastName(person.getLastName());
        existingPerson.setDateOfBirth(person.getDateOfBirth());
        existingPerson.setEmail(person.getEmail());

        // saves the updated person back to the repository
        return personRepository.save(existingPerson);

    }
    
}
