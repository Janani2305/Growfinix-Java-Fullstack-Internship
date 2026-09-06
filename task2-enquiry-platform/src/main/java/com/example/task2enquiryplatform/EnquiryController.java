package com.example.task2enquiryplatform;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/enquiries")
public class EnquiryController {

    @Autowired
    private EnquiryRepository enquiryRepository;

    // CREATE
    @PostMapping
    public Enquiry createEnquiry(@RequestBody Enquiry enquiry) {
        return enquiryRepository.save(enquiry);
    }

    // READ ALL
    @GetMapping
    public List<Enquiry> getAllEnquiries() {
        return enquiryRepository.findAll();
    }

    // READ ONE
    @GetMapping("/{id}")
    public Enquiry getEnquiryById(@PathVariable Long id) {
        return enquiryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Enquiry not found"));
    }

    // UPDATE
    @PutMapping("/{id}")
    public Enquiry updateEnquiry(@PathVariable Long id, @RequestBody Enquiry updatedEnquiry) {
        Enquiry enquiry = enquiryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Enquiry not found"));

        enquiry.setCustomerName(updatedEnquiry.getCustomerName());
        enquiry.setEmail(updatedEnquiry.getEmail());
        enquiry.setPhone(updatedEnquiry.getPhone());
        enquiry.setDestination(updatedEnquiry.getDestination());
        enquiry.setMessage(updatedEnquiry.getMessage());
        enquiry.setStatus(updatedEnquiry.getStatus());

        return enquiryRepository.save(enquiry);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public String deleteEnquiry(@PathVariable Long id) {
        enquiryRepository.deleteById(id);
        return "Enquiry deleted successfully";
    }
}