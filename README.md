== HW1, deadline: 3/3(Mon.) 23:59

(30%) Do exercise 5.2 of Exercises in Programming Style (see below.) Hint: apply currying to remove_stop_words. Write unit tests for this and change the main program to use this function.

Example program: https://github.com/crista/exercises-in-programming-style/blob/master/06-pipeline/tf-06.py
In the example program, the name of the file containing the list of stop words is hard-coded (line #36). Modify the program so that the name of the stop words file is given as the second argument in the command line. You must observe the following additional stylistic constraints: (1) no function can have more than 1 argument, and (2) the only function that can be changed is remove_stop_words; it’s ok to change the call chain in the main block in order to reflect the changes in remove_stop_words.


(30%) Show with unit testing for the functions in the Cookbook style that are not idempotent and describe the reason in the comment.


(40%) Rewrite the Pipeline style in Go, including unit tests.
