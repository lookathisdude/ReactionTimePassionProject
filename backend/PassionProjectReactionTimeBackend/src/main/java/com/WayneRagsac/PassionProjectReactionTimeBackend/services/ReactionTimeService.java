package com.WayneRagsac.PassionProjectReactionTimeBackend.services;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.WayneRagsac.PassionProjectReactionTimeBackend.entities.ReactionTimeEntity;
import com.WayneRagsac.PassionProjectReactionTimeBackend.repository.ReactionTimeRepository;
import com.WayneRagsac.PassionProjectReactionTimeBackend.services.interfaces.ReactionTimeServiceInterface;

@Service
public class ReactionTimeService implements ReactionTimeServiceInterface {

    private final ReactionTimeRepository reactionTimeRepository;

    public ReactionTimeService(ReactionTimeRepository reactionTimeRepository) {
        this.reactionTimeRepository = reactionTimeRepository;
    }

    @Override
    public List<ReactionTimeEntity> getAllReactionTimes() {
        try {
            // Fetch all reaction times from the database
            return reactionTimeRepository.findAll();
        } catch (Exception e) {
            // Log the error and return an empty list
            System.err.println("Error fetching all reaction times: " + e.getMessage());
            return List.of(); // Return an empty list in case of error
        }
    }

    @Override
    public List<ReactionTimeEntity> getReactionTimesByUser(String userId) {
        try {
            // Fetch reaction times for the specified user from the database
            return reactionTimeRepository.findByUserId(userId);
        } catch (Exception e) {
            // Log the error and return an empty list
            System.err.println("Error fetching reaction times for user " + userId + ": " + e.getMessage());
            return List.of(); // Return an empty list in case of error
        }
    }

    @Override
    public ReactionTimeEntity addReactionTime(String userId, int reactionTime) {
        try {
            ReactionTimeEntity newReactionTime = new ReactionTimeEntity();
            newReactionTime.setUserId(userId);
            newReactionTime.setReactionTime(reactionTime);
            return reactionTimeRepository.save(newReactionTime);
        } catch (Exception e) {
            // Log the error
            System.err.println("Error adding reaction time for user " + userId + ": " + e.getMessage());
            return null; // Return null in case of error
        }
    }

    @Override
    public ReactionTimeEntity getReactionTimeById(UUID id) {
        try {
            return reactionTimeRepository.findById(id).orElse(null);
        } catch (Exception e) {
            // Log the error
            System.err.println("Error fetching reaction time by ID " + id + ": " + e.getMessage());
            return null; // Return null in case of error
        }
    }

}
