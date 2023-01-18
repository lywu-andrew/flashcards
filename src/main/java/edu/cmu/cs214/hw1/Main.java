package edu.cmu.cs214.hw1;

import edu.cmu.cs214.hw1.cli.UI;
import edu.cmu.cs214.hw1.data.CardLoader;
import edu.cmu.cs214.hw1.data.CardStore;
import edu.cmu.cs214.hw1.ordering.CardDeck;
import edu.cmu.cs214.hw1.ordering.prioritization.CardShuffler;

import java.io.File;
import java.io.IOException;

public final class Main {

    private Main() {
        // Disable instantiating this class.
        throw new UnsupportedOperationException();
    }

    public static void main(String[] args) throws IOException {
        CardStore cards = new CardLoader().loadCardsFromFile(new File("cards/designpatterns.csv"));
        CardDeck cardDeck = new CardDeck(cards.getAllCards(), new CardShuffler());
        new UI().studyCards(cardDeck);
    }

}
