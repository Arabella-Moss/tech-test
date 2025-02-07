package harker.techtest;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Person {

    @Id
    public String id;

    public String firstName;
    public String lastName;
    public String dateOfBirth;
    public String email;


}

// defines Person class as a representation of a person in the database, with fields for storing info
// the entity and ID annotations integrate the class with a database, allowing for easy storage and retrieval 