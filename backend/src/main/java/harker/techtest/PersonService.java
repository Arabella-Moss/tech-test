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

    public Person postPerson(Person person) {
        return personRepository.save(person);
    }
    
}