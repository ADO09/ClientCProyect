import { Component, OnInit } from '@angular/core';
import { environment } from 'environments/environment';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { Database, getDatabase, ref, set, onValue,orderByValue } from "firebase/database";
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators, Form } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { Chat, userSendMessageInterface } from '@data/interfaces';
import { ApiService } from '@data/services/api/login/api.service';
import { ChatService } from '@data/services/chatfirebase/chat.service';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  public title = 'firechat';
  public app!: FirebaseApp;
  public db!: Database;
  public form!: FormGroup;
  public currentUserSendMessage!:userSendMessageInterface;
  public username = '';
  public message = '';
  public currentUser = this.authService.getUser.usuario;
  public chats: Chat[] = [];
  public userschats:any[]=[];
  public usersOnline:any[]= [];
  public userSendMessage:any;
  public nameSendMessage:any;
  public fotografiaSendMessage:any;
  public DataChatUser!:userSendMessageInterface;
  public formDataSend!:userSendMessageInterface;
  constructor( private formBuilder: FormBuilder,
    public authService:ApiService,
    private chatService:ChatService
    ) {
    this.app = initializeApp(environment.firebase);
    this.db = getDatabase(this.app);
    this.form = this.formBuilder.group({
      'message' : [],
      'username' : []
    });


    if (chatService.useSendMessage) {
      this.userSendMessage = chatService.useSendMessage;
    }else{
      this.userSendMessage = null
    }
  
    // console.log(this.userSendMessage);
  }


  // set setUsuario(usuario:any){
  //   this.userSendMessage = usuario;
  // }

  


  onChatSubmit(form: any) {

    this.chatService.GetDataUserChatSave(this.userSendMessage).subscribe( r => {


    const chat = form;
    chat.timestamp = new Date().toString();
    chat.id = uuidv4();
    chat.fotografia = r.data.fotografia;
    chat.username =  this.userSendMessage ;
    set(ref(this.db, `chats/${this.currentUser}/${this.userSendMessage}/${chat.id}`), chat);

    const chatsend = form;
    chatsend.timestamp = new Date().toString();
    chatsend.id = uuidv4();
    chatsend.fotografia = this.authService.getUser.fotografia;
    chatsend.username = this.userSendMessage  ;
    set(ref(this.db, `chats/${this.userSendMessage}/${this.currentUser}/${chat.id}`), chatsend);
    this.form = this.formBuilder.group({
      'message' : [], 
    });

    


   
      //console.log(r.data.nombre);
       // this.currentUserSendMessage= r.data;
      set(ref(this.db, `chats/usersWithmessages/${this.currentUser}/${this.userSendMessage}`), r.data);
     
    })

    var id_user:any;
    if (this.authService.getUser.TipoUsuario ==  'fisioterapeuta') {
      id_user =  this.authService.getUser.id_fisio;
    } else {
      id_user = this.authService.getUser.id_cliente;
    }

    var currentUserDataMessage:userSendMessageInterface = {

      id_user:id_user,
      nombre:this.authService.getUser.nombre,
      fotografia:this.authService.getUser.fotografia,
      TipoUsuario:this.authService.getUser.TipoUsuario,
      usuario:this.authService.getUser.usuario
     
    }

    
    set(ref(this.db, `chats/usersWithmessages/${this.userSendMessage}/${this.currentUser}`), currentUserDataMessage);

  }

  ngOnInit(): void {

  
    if (this.chatService.useSendMessage) {

      const chatMessage = ref(this.db, `chats/${this.currentUser}/${this.userSendMessage}`);
      onValue(chatMessage, (snapshot: any) => {
        const messages = snapshot.val();
        for(let id in messages) {
          if (!this.chats.map(chat => chat.id).includes(id)) {
            this.chats.push(messages[id])
          }
        }
      });

      // console.log(this.chats)
    }
  


     const online =  (ref(this.db, `chats/usersOnline/`));
     console.log(online);

     onValue(online,(snapshot:any) => {
    const onlinesUsers = (snapshot.val());

    if (onlinesUsers) {
        
      // var keys = Object.keys(users);
      // console.log(keys);
      this.usersOnline.length = 0;
     for(let data in onlinesUsers) {
       
       if (!this.usersOnline.map(user => user.name).includes(data)) {
         this.usersOnline.push(onlinesUsers[data])
        
       }
     }

     console.log(onlinesUsers);

    
        
    }
     })
    const usersRef = ref(this.db,  `chats/usersWithmessages/${this.currentUser}`);
    onValue(usersRef, (snapshot: any) => {
      const users = snapshot.val();
      console.log(users)
     
      
      // users.online=1;
     
      
      if (users) {
        
        // var keys = Object.keys(users);
        // console.log(keys);
       this.userschats.length = 0;
       for(let data in users) {
         
         if (!this.userschats.map(user => user.name).includes(data)) {
           this.userschats.push(users[data])
          // console.log(this.userschats);
         }
       }
      }
   
    });



   
    console.log(this.userschats);

    for(let user in this.userschats){
    
      if (!this.userschats.map(user => user.name).includes(user)) {
        console.log(user);
        
        // this.userschats.push(user[data])
       // console.log(this.userschats);
      }
    }
  }

  changeUser(user:userSendMessageInterface){
      // console.log(user);
      this.userSendMessage = user.usuario;
    this.nameSendMessage =  user.nombre;
    this.fotografiaSendMessage = user.fotografia;
    // console.log(user.usuario);

    if (this.chats.length>0) {
      this.chats.length = 0;
    }
      
      const chatMessage = ref(this.db, `chats/${this.currentUser}/${this.userSendMessage}`);
      onValue(chatMessage, (snapshot: any) => {
        const messages = snapshot.val();
        for(let id in messages) {
          if (!this.chats.map(chat => chat.id).includes(id)) {
            this.chats.push(messages[id])
          }
        }
      });

      // console.log(this.chats)
      
      // console.log('aosidj');
      
  }



}
