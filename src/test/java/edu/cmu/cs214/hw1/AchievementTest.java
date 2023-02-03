package edu.cmu.cs214.hw1;

import org.junit.Before;
import org.junit.Test;

import edu.cmu.cs214.hw1.achievement.AchievementChecker;
import edu.cmu.cs214.hw1.achievement.AchievementType;
import edu.cmu.cs214.hw1.cards.CardStatus;
import edu.cmu.cs214.hw1.data.CardLoader;
import edu.cmu.cs214.hw1.data.CardStore;
import edu.cmu.cs214.hw1.ordering.CardDeck;
import edu.cmu.cs214.hw1.ordering.repetition.RepeatingCardOrganizer;

import static org.junit.Assert.*;

import java.io.File;
import java.io.IOException;
import java.util.List;

public class AchievementTest {

    private AchievementChecker ac;
    private CardDeck cardDeck;

    public CardDeck reset(CardDeck cd) {
        for (CardStatus card : cardDeck.getCards()) {
            card.clearResults();
        }
        return cardDeck;
    }

    /**
     * Called before each test.
     * @throws IOException
     */
    @Before
    public void setUp() throws IOException {
        ac = new AchievementChecker();
        File f = new File("cards/designpatterns.csv");
        CardStore cards = new CardLoader().loadCardsFromFile(f);
        cardDeck = new CardDeck(cards.getAllCards(), new RepeatingCardOrganizer(10));
    }

    @Test
    public void testGetStartTime() {
        assertTrue(ac.getStartTime() == 0);
    }

    @Test
    public void testNewStartTime() {
        ac.beginRound();
        assertTrue(ac.getStartTime() != 0);
    }

    @Test
    public void testCorrectAchievementTypeCorrect() {
        cardDeck = reset(cardDeck);
        for (CardStatus card : cardDeck.getCards()) {
            card.recordResult(true);
        }
        assertTrue(AchievementType.CORRECT.isAchieved(ac.getStartTime(), cardDeck));
    }

    @Test
    public void testCorrectAchievementTypeIncorrect() {
        cardDeck = reset(cardDeck);
        for (CardStatus card : cardDeck.getCards()) {
            card.recordResult(false);
        }
        assertTrue(!AchievementType.CORRECT.isAchieved(ac.getStartTime(), cardDeck));
    }

    @Test
    public void testSpeedAchievementTypeCorrect() {
        cardDeck = reset(cardDeck);
        ac.beginRound();
        assertTrue(AchievementType.SPEED.isAchieved(ac.getStartTime(), cardDeck));
    }

    @Test
    public void testSpeedAchievementTypeIncorrect() {
        AchievementChecker tempac = new AchievementChecker();
        cardDeck = reset(cardDeck);
        assertTrue(!AchievementType.SPEED.isAchieved(tempac.getStartTime(), cardDeck));
    }

    @Test
    public void testRepeatAchievementTypeCorrect() {
        cardDeck = reset(cardDeck);
        for (CardStatus card : cardDeck.getCards()) {
            for (int i = 0; i < 6; i++) card.recordResult(true);
        }
        assertTrue(AchievementType.REPEAT.isAchieved(ac.getStartTime(), cardDeck));
    }


    @Test
    public void testRepeatAchievementTypeIncorrect() {
        cardDeck = reset(cardDeck);
        for (CardStatus card : cardDeck.getCards()) {
            card.recordResult(true);
        }
        assertTrue(!AchievementType.REPEAT.isAchieved(ac.getStartTime(), cardDeck));
    }

    @Test
    public void testCheckNewAchievementsAll() {
        cardDeck = reset(cardDeck);
        for (CardStatus card : cardDeck.getCards()) {
            for (int i = 0; i < 6; i++) card.recordResult(true);
        }
        ac.beginRound();
        List<String> achievements = ac.checkNewAchievements(cardDeck);
        assertTrue(achievements.size() == 3);
        assertTrue(achievements.contains(AchievementType.CORRECT.toString()));
        assertTrue(achievements.contains(AchievementType.SPEED.toString()));
        assertTrue(achievements.contains(AchievementType.REPEAT.toString()));
        List<String> results = ac.checkNewAchievements(cardDeck);
        assertTrue(results.size() == 0);
    }

    @Test
    public void testCheckNewAchievementsNone() {
        cardDeck = reset(cardDeck);
        for (CardStatus card : cardDeck.getCards()) {
            card.recordResult(false);
        }
        AchievementChecker tempac = new AchievementChecker();
        List<String> achievements = tempac.checkNewAchievements(cardDeck);
        assertTrue(achievements.size() == 0);
    }
}
