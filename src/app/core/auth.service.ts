import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
// import { auth } from 'firebase';
import * as firebase from 'firebase/app';
@Injectable()
export class AuthService {
    authState: any = null;
    constructor(public afAuth: AngularFireAuth ) {
        this.afAuth.authState.subscribe(data => this.authState = data);
    }

    get authenticated(): boolean {
        return this.authState !== null;
    }

    get currentUserId(): string {
        return this.authenticated ? this.authState.uid : null;
    }
    login() {
        //To Do, for now signing with a popup, function from firebase
        this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    }
    logout() {
        this.afAuth.auth.signOut();
    }
}