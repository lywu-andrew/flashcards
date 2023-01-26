package edu.cmu.cs214.hw1;

import edu.cmu.cs214.hw1.cli.UI;
import edu.cmu.cs214.hw1.data.CardLoader;
import edu.cmu.cs214.hw1.data.CardStore;
import edu.cmu.cs214.hw1.ordering.CardDeck;
import edu.cmu.cs214.hw1.ordering.CardOrganizer;
import edu.cmu.cs214.hw1.ordering.prioritization.CardShuffler;
import edu.cmu.cs214.hw1.ordering.prioritization.MostMistakesFirstSorter;
import edu.cmu.cs214.hw1.ordering.prioritization.RecentMistakesFirstSorter;

import java.io.File;
import java.io.IOException;

import joptsimple.OptionParser;
import joptsimple.OptionSet;
import joptsimple.OptionSpec;

import java.util.Scanner;

public final class Main {

    private Main() {
        // Disable instantiating this class.
        throw new UnsupportedOperationException();
    }

    public static void main(String[] args) throws IOException {
        OptionParser parser = new OptionParser();
        OptionSpec<File> file = parser.nonOptions("flashcard").ofType( File.class );
        parser.accepts( "help" ).forHelp();
        OptionSpec<String> order = parser.accepts( "order" ).withRequiredArg().ofType( String.class ).defaultsTo("random");
        OptionSpec<Integer> repetitions = parser.accepts( "repetitions" ).withRequiredArg().ofType( Integer.class ).defaultsTo(1);
        parser.accepts( "invertCards" );

        Scanner scanner = new Scanner(System.in);
        String[] input = scanner.nextLine().split(" ");
        OptionSet options = parser.parse(input);
        scanner.close();

        if (options.has("help")) {
            // print help screen
        }

        String orderValue = options.valueOf(order);
        CardOrganizer organizer = new CardShuffler();
        if (orderValue.equals("random")) {
            organizer = new CardShuffler();
        } else if (orderValue.equals("worst-first")) {
            organizer = new MostMistakesFirstSorter();
        } else if (orderValue.equals("recent-mistakes-first")) {
            organizer = new RecentMistakesFirstSorter();
        } else {
            // error handling
        }
        int repetitionValue = options.valueOf(repetitions);
        if (repetitionValue < 1) {
            // error handling
        }

        CardStore cards = new CardLoader().loadCardsFromFile(options.valueOf(file));
        if (options.has("invertCards")) {
            cards.invertCards();
        }
        CardDeck cardDeck = new CardDeck(cards.getAllCards(), organizer);
        new UI().studyCards(cardDeck);
    }

}
