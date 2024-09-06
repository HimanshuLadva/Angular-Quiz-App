import { Component, OnInit } from '@angular/core';
import { ApidataService } from '../apidata.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent implements OnInit {
  constructor(private readonly quizApi: ApidataService,private readonly route: Router) { }
  questionShow: boolean = true;
  resultShow: boolean = false;
  loaderShow: boolean = true;
  currentQuestion:{question:string, options:string[]}={question:'', options:[]};
  questionArray: { question: string; options:string[], answer:string }[] = [];
  resultArray: {question: string,isCorrect: string,isReceive: string,options:string[]}[] = [];
  quizLength: number = 0;
  rightAttempt: number = 0;
  index:number = 0;

  ngOnInit(): void {
    this.getQuestionsList();
    this.questionShow = false;
  }
 
  shuffleData(array: string[]) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]
   }
  
    return array;
  }

  getQuestionsList() {
    this.quizApi.getApiData().subscribe((data:any) => {
      if (data) {
        this.loaderShow = false;
        this.questionShow = true;
      }
      data.results.forEach((ele: {question:string, correct_answer:string, incorrect_answers:string[], answer:string}) => {        
        this.questionArray.push({
          question: ele.question,
          options: this.shuffleData([ele.correct_answer, ...ele.incorrect_answers]),
          answer:ele.correct_answer,
        });
      });
      this.currentQuestion = {question:this.questionArray[0].question, options:[...this.questionArray[0].options]}
      this.quizLength = this.questionArray.length;
    });
  }

  changeQuestion(option: string, question: string) {
    if (this.questionArray.length === 1) {
      this.questionShow = false;
      this.resultShow = true;
    }
    this.resultArray.push({
      question: question,
      isCorrect: this.questionArray[0].answer,
      isReceive: option,
      options:[...this.questionArray[0].options]
    });
      
    if (this.questionArray[0].answer == option) {
      this.rightAttempt = this.rightAttempt + 1;
    }
    if (this.questionArray.length > 1) {
      this.questionArray.splice(0, 1);
      this.currentQuestion = {question:this.questionArray[0].question, options:[...this.questionArray[0].options]}
    }
  }

  resetQuiz() {
    this.route.navigate(['']);
  }

  matchResult(id: number, option: string) {
    let arr = this.resultArray[id];
    if (arr.isCorrect == option) {
      return 'green';
    }
    else if (arr.isReceive == option) {
      return 'red';
    }
    return '';  
  }

  getScore() {
    return this.resultArray.filter((ele)=> ele.isCorrect==ele.isReceive).length;
  }
}