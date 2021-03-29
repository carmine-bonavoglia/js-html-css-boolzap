var app = new Vue({
    
    el: '#app',
    data: {
        counter: -1,
        timesClicked: 0,
        counterMex: null,
        delDisplay: false,
        userText:'',
        searchText: '',
        personalId: {
            name: 'Carmine',
            avatar: 'avatar_2.jpg'
        },
        contacts: [
            {
                name: 'Michele',
                access: '',
                avatar: 'avatar_1.jpg',
                hover: false,
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        text: 'Hai portato a spasso il cane?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        text: 'Ricordati di dargli da mangiare',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 16:15:22',
                        text: 'Tutto fatto!',
                        status: 'received'
                    }
                ]
            },
            {
                name: 'Fabio',
                access: '',
                avatar: 'avatar_7.jpg',
                hover: false, 
                visible: true,
                messages: [
                    {
                        date: '20/03/2020 16:30:00',
                        text: 'Ciao come stai?',
                        status: 'sent'
                    },
                    {
                        date: '20/03/2020 16:30:55',
                        text: 'Bene grazie! Stasera ci vediamo?',
                        status: 'received'
                    },
                    {
                        date: '20/03/2020 16:35:00',
                        text: 'Mi piacerebbe ma devo andare a fare la spesa.',
                        status: 'sent'
                    }
                ]
            },
            {
                name: 'Samuele',
                access: '',
                avatar: 'avatar_8.jpg',
                hover: false,
                visible: true,
                messages: [
                    {
                        date: '28/03/2020 10:10:40',
                        text: 'La Marianna va in campagna',
                        status: 'received'
                    },
                    {
                        date: '28/03/2020 10:20:10',
                        text: 'Sicuro di non aver sbagliato chat?',
                        status: 'sent'
                    },
                    {
                        date: '28/03/2020 16:15:22',
                        text: 'Ah scusa!',
                        status: 'received'
                    }
                ]
            },
            {
                name: 'Luisa',
                access: '',
                avatar: 'avatar_io.jpg',
                hover: false,
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        text: 'Lo sai che ha aperto una nuova pizzeria?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        text: 'Si, ma preferirei andare al cinema',
                        status: 'received'
                    }
                ]
            }
        ],
        infoMenu: ['Rispondi','Inoltra messaggio','Messaggio Importante','Elimina Messaggio'],
        accessesList: ['online', 'Sta scrivendo...', 'Ultimo accesso di recente', 'Ultimo accesso']
    },
    created() {
        this.contacts.forEach(element => {
            element.access = this.accessesList[3] + ' ' + this.randomAccess();
        });
    },
    methods: {
        selectContact(indice){
            this.counter = indice;
            this.counterMex = null;
        },
        addMex() {
            if (this.userText.length > 0) {

                let time = this.generaRandom(3,6) * 1000;
                
                this.contacts[this.counter].messages.push({
                    date: moment().locale('it').format('LT'),
                    text: this.userText,
                    status: 'sent'
                });

                setTimeout(() => {
                    this.contacts[this.counter].access = this.accessesList[0];
                }, time);

                setTimeout(() => {
                    this.contacts[this.counter].access = this.accessesList[1];
                }, time + 1500);

                setTimeout(() => {
                    
                    this.contacts[this.counter].messages.push({
                        date: moment().locale('it').format('LT'),
                        text: 'ok',
                        status: 'received'
                    });

                    this.contacts[this.counter].access = this.accessesList[0]

                }, time + 3500);

                setTimeout(() => {
                    this.contacts[this.counter].access = this.accessesList[2];
                }, time + 5500);
            }

            this.userText = '';
        },
        classSwitch(element, index) {
            if(element.hover) {
                return 'hover';
            };

            if (index == this.counter) {
                return 'selected';
            };
        },
        mouseOver(element, index) {
            if (!element.hover && index != this.counter) {
                return element.hover = true;
            }
        },
        filterChat() {
            if (this.searchText.length > 0) {
                this.contacts.forEach(element => {
                    if (element.name.toLowerCase().includes(this.searchText.toLowerCase())) {
                        element.visible = true;
                    } else {
                        element.visible = false;
                    }
                });
            } else {
                this.contacts.forEach(element => {
                    element.visible = true;
                });
            }
        },
        selectMex(index) {
            if (this.timesClicked == 0) {
                this.counterMex = index;
                this.timesClicked++;
            } else {
                this.counterMex = null;
                this.timesClicked--;
            }
        },
        deleteMex(index) {
            if (index == this.infoMenu.length - 1) {    
                this.delDisplay = true;
            }
        },
        deleteMexConfirm() {
            this.contacts[this.counter].messages.splice(this.counterMex, 1);

            if (this.contacts[this.counter].messages.length == 0) {
                this.contacts[this.counter].messages.push({
                    date: moment().locale('it').format('LT'),
                    text: 'Inizia una nuova chat con ' + this.contacts[this.counter].name + '!',
                    status: 'received'
                });
            }

            this.counterMex = null;
            this.delDisplay = false;
        },
        deleteMexUndo() {
            this.counterMex = null;
            this.delDisplay = false;
        },
        generaRandom(min, max) {
            return Math.floor(Math.random() * (max - min + 1) ) + min;
        },
        randomAccess() {
            const timeArr = ['ore', 'minuti'];
            const time = timeArr[this.generaRandom(0,1)];
            
            if (time == 'ore') {
                newTime = this.generaRandom(2,23) + ' ' + time + ' fa';
            } else {
                newTime = this.generaRandom(2,59) + ' ' + time + ' fa';
            }

            return newTime;
        }
    }
});