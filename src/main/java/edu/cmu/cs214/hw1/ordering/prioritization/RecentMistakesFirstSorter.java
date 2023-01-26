package edu.cmu.cs214.hw1.ordering.prioritization;

import edu.cmu.cs214.hw1.cards.CardStatus;
import edu.cmu.cs214.hw1.ordering.CardOrganizer;

import java.util.ArrayList;
import java.util.List;

/**
 * A class that sorts a list of {@link CardStatus} cards by putting the incorrectly answered cards first.
 */
public class RecentMistakesFirstSorter implements CardOrganizer {

    /**
     * Orders the cards so that those that were answered incorrectly on the last answer appear first. This is a a stable ordering.
     *
     * @param cards The {@link CardStatus} objects to order.
     * @return The final ordered list of cards.
     */
    @Override
    public List<CardStatus> reorganize(List<CardStatus> cards) {
        int size = cards.size();
        List<CardStatus> prevFailures = new ArrayList<>();
        int i = 0;
        while (i < size) {
            List<Boolean> successes = cards.get(i).getResults();
            int succSize = successes.size();
            if (succSize == 0) {
                continue;
            } else {
                boolean lastResult = successes.get(succSize-1);
                if (!lastResult) {
                    CardStatus removed = cards.remove(i);
                    prevFailures.add(removed);
                    size -= 1;
                } else {
                    i += 1;
                }
            }
        }
        prevFailures.addAll(cards);
        return prevFailures;
    }
}
