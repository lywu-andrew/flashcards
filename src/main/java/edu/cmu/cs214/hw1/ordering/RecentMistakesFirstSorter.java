package edu.cmu.cs214.hw1.ordering;

import edu.cmu.cs214.hw1.cards.CardStatus;

import java.util.ArrayList;
import java.util.List;

/**
 * A class that sorts a list of {@link CardStatus} cards by putting the incorrectly answered cards first.
 */
public class RecentMistakesFirstSorter implements CardOrganizer {

    /**
     * Applies each {@link CardOrganizer} instance to the provided collection of cards. This method makes no guarantees
     * about the order in which the underlying sorters are invoked; the final order may be dependent on this order when
     * conflicting priorities are involved.
     *
     * @param cards The {@link CardStatus} objects to order.
     * @return The final, filtered and ordered list of cards.
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
