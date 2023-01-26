package edu.cmu.cs214.hw1;

import edu.cmu.cs214.hw1.Exceptions.*;
import edu.cmu.cs214.hw1.cli.UI;
import edu.cmu.cs214.hw1.data.CardLoader;
import edu.cmu.cs214.hw1.data.CardStore;
import edu.cmu.cs214.hw1.ordering.CardDeck;
import edu.cmu.cs214.hw1.ordering.CardOrganizer;
import edu.cmu.cs214.hw1.ordering.CombinedCardOrganizer;
import edu.cmu.cs214.hw1.ordering.prioritization.CardShuffler;
import edu.cmu.cs214.hw1.ordering.prioritization.MostMistakesFirstSorter;
import edu.cmu.cs214.hw1.ordering.prioritization.RecentMistakesFirstSorter;
import edu.cmu.cs214.hw1.ordering.repetition.RepeatingCardOrganizer;

import java.io.File;
import java.io.IOException;

import joptsimple.OptionParser;
import joptsimple.OptionSet;
import joptsimple.OptionSpec;

import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public final class Main {

    private Main() {
        // Disable instantiating this class.
        throw new UnsupportedOperationException();
    }

    public static void main(String[] args) throws IOException, InvalidRepetitionValueException, InvalidOrderValueException {
        OptionParser parser = new OptionParser();
        OptionSpec<String> fileString = parser.nonOptions("flashcard").ofType( String.class ).describedAs("cards-file");
        parser.accepts( "help", "Show this help" ).forHelp();
        OptionSpec<String> order = parser.accepts( "order", "The type of ordering to use, " +
                                                    "[choices: \"random\", \"worst-first\", \"recent-mistakes-first\"]" )
                                                    .withRequiredArg().ofType( String.class ).describedAs("order").defaultsTo("random");
        OptionSpec<Integer> repetitions = parser.accepts( "repetitions", "The number of times to each card " + 
                                                            "should be answered successfully. If not provided, " +
                                                            "every card is presented once, regardless of the correctness of the answer." )
                                                            .withRequiredArg().ofType( Integer.class ).describedAs("num").defaultsTo(1);
        parser.accepts( "invertCards", "If set, it flips answer and question for each card. " +
                            "That is, it prompts with the card's answer and asks the user to " +
                            "provide the corresponding question. Default: false" );

        Scanner scanner = new Scanner(System.in);
        String input = scanner.nextLine();
        String[] splitInput = input.split(" ");
        OptionSet options = parser.parse(splitInput);

        if (options.has("help")) {
            parser.printHelpOn( System.out );
            System.exit(0);
        } else {
            try {
                List<String> s = options.valuesOf(fileString);
                File loadCards = new File(s.get(1));
                CardStore cards = new CardLoader().loadCardsFromFile(loadCards);
                if (options.has("invertCards")) {
                    cards = cards.invertCards();
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
                    scanner.close();
                    throw new InvalidOrderValueException("Invalid order value:" + orderValue);
                }
                int repetitionValue = options.valueOf(repetitions);
                if (repetitionValue < 1) {
                    scanner.close();
                    throw new InvalidRepetitionValueException("Repetition value cannot be less than 1: " + repetitionValue);
                } else {
                    List<CardOrganizer> organizers = new ArrayList<>();
                    organizers.add(organizer);
                    organizers.add(new RepeatingCardOrganizer(repetitionValue));
                    organizer = new CombinedCardOrganizer(organizers);
                    System.out.println("hi");
                }
    
                CardDeck cardDeck = new CardDeck(cards.getAllCards(), organizer);
                new UI().studyCards(cardDeck);
                scanner.close();
            } catch (IOException ioe){
                System.out.println("File not found, check the file path again.");
            } catch (InvalidOrderValueException iove) {
                System.out.println("Please input a valid type of ordering.");
            } catch (InvalidRepetitionValueException iove) {
                System.out.println("Please input a repetition value of 1 or higher.");
            }
        }
    }

}
