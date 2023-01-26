package edu.cmu.cs214.hw1;

public class Exceptions {
    static class InvalidRepetitionValueException extends Exception { 
        public InvalidRepetitionValueException(String errorMessage) {
            super(errorMessage);
        }
    }

    static class InvalidOrderValueException extends Exception { 
        public InvalidOrderValueException(String errorMessage) {
            super(errorMessage);
        }
    }
}
