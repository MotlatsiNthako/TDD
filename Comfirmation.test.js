import { render, screen } from '../test-utils/testing-library-utils';
import {render, screen} from '../node_modules'
import { Server} from 'mocks/Server';
import { rest } from 'msw';


import OrderConfirmation from './Pages'

test('error response from server for submitting order', async()=>{

 //override default Msw response for options endpoint with error response
 Server.resetHandlers(
     rest.post('https//localhost:3030/order', (req, res, ctx)=>
     rest(ctx.status(500)) )

   );




    render(<OrderConfirmation setOrderPhase={jest.fn()}/>);

    const alert = await screen.findByRole('alert');
    expert(alert).toHaveTextContent(
        'An unexpected error occurred. Please try again later.'
    );

});


















