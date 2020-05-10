import React from 'react';
import { IonSegment, IonSegmentButton, IonLabel } from '@ionic/react';

// we can set selectedValue to selectedValue : string or in this case more specific only to 2 options we have
const InputControl: React.FC<{selectedValue: 'mkg' | 'ftlbs'; onSelectValue: (value: 'mkg' | 'ftlbs') => void}> = props => {
    // extracting value from onIonChange. CustomEvent is TS,  (event.detail.value) is Ionic 
    const inputChangeHandler = (event: CustomEvent) => {
        props.onSelectValue(event.detail.value)
    };

    return (
        <IonSegment value={props.selectedValue} onIonChange={inputChangeHandler}>
            <IonSegmentButton value="mkg">
                <IonLabel>m/kg</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="ftlbs">
                <IonLabel>ft/lbs</IonLabel>
            </IonSegmentButton>
        </IonSegment>
    )
}

export default InputControl;