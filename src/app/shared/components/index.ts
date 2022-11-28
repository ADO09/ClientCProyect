//Import components
import { ListFisiocardComponent } from './cardlist/list-fisiocard/list-fisiocard.component';
import { ListClientListComponent } from './cardlist/list-client-list/list-client-list.component' 
import { CardLoaderComponent } from './loaders/card-loader/card-loader.component';
import { SearchCitaComponent } from './search-cita/search-cita.component';
import { CardlistCitasComponent } from './cardlist/cardlist-citas/cardlist-citas.component';
import { NgbdDatepickerPopupComponent } from './general/ngbd-datepicker-popup/ngbd-datepicker-popup.component';
import { CardlistPlanesComponent } from './cardlist/cardlist-planes/cardlist-planes.component';
import { ExpMedicoListComponent } from './list/exp-medico-list/exp-medico-list.component';

export const component:any[]=[

    //LISTAS
    ListClientListComponent,
    ListFisiocardComponent,
    CardlistCitasComponent,
    //LOADERS
     CardLoaderComponent,

     //GENERAL
     NgbdDatepickerPopupComponent,
     //SEARCH
     SearchCitaComponent,

     //PLANES
     CardlistPlanesComponent,

     //EXPEDIENTE MEDICO
     ExpMedicoListComponent,


    
];


//export all components

export *  from './cardlist/list-fisiocard/list-fisiocard.component';


//loaders
export * from './loaders/card-loader/card-loader.component';
