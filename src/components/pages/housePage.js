import React, {Component} from 'react';
import RowBlock from '../rowBlock/rowBlock';
import gotService from '../../services/gotService';
import ItemList from '../itemList';
import ItemDetails, { Field } from '../itemDetails/itemDetails';
import ErrorMessage from '../errorMessage/errorMessage';


export default class HousePage extends Component  {

   gotService = new gotService();

   state = {
      selectedItem: null,
      error: false
   }

   onItemSelected = (id) => {
      this.setState({
          selectedItem: id
      });
   }

   componentDidCatch() {
      this.setState({
         error: true
      });
   }

   render() {
      if (this.state.error) {
         return <ErrorMessage/>
      }

      const itemList = (
         <ItemList 
            onItemSelected={this.onItemSelected}
            getData={this.gotService.getAllHouses}
            renderItem={(item) => item.name} />
      );

      const itemDetails = (
         <ItemDetails
            itemId={this.state.selectedItem}
            getData={this.gotService.getHouse}>
            <Field field="region" label="Region" />
            <Field field="words" label="Words" />
            <Field field="titles" label="Titles" />
            <Field field="ancestralWeapons" label="Ancestral Weapons" />
         </ItemDetails>
      );

      return (
         <RowBlock left={itemList} right={itemDetails}/>
      )
   }
}
