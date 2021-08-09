//simport { render, screen } from '@testing-library/react';
import App from './App';
import UserEvent from '@testing-library/user-event';
import userEvent from '@testing-library/user-event';


test ('Order phases for happy path', async () => {
  //render app
  //no need to wrap provider as is already wrapped
    render (<App/>);

    const vanillationInput = await screen.findByRole('spinbutton', {

      name: 'Vanillation'
    });


  userEvent.clear(vanillationInput);
  userEvent.type(vanillationInput, '1');

  const chocolateIput = screen.getByRole('spinbutton', { name: 'chocolate'});
    userEvent.clear(chocolateIput);
    userEvent.type(chocolateIput, '2');

  const cherriesCheckbox = await screen.findByRole('checkbox', {

    name: 'Cherries',
  });
  userEvent.click(cherriesCheckbox);

  const orderSummaryButton = screen.getByRole('button', {
    name: /order sundae/i,
  });
  userEvent.click(orderSummaryButton);

  const summaryHeading = screen.getByRole('heading', { name: 'Order Summary'});
  expect(summaryHeading).toBeInTheDocument();

  const scoopheading = screen.getByRole('heading', {name: 'Scoops: $6.00'});
  expect(scoopheading).toBeInTheDocument();

  const toppingsHeading = screen.getByRole('heading',{
    name: 'Toppings: $1.50',
  });
  expect (toppingsHeading).toBeInTheDocument();

  expect (screen.getByText('1 vanilla')).toBeInTheDocument();
  expect (screen.getByText('2 Chocolate')).toBeInTheDocument();
  expect (screen.getByText('Cherries')).toBeInTheDocument();

  const tcCheckbox = screen.getByRole('checkbox', {

    name: /terms and conditions/i,
  });
  //check box unables to confirm order button
  userEvent.click(tcCheckbox);

  const confirmationOrderButton = screen.getByRole('button', {
    name: /confirmationOrder/i,
  });
  //confirmationOrderButton takes us to confirmation Order page
  userEvent.click(confirmationOrderButton);

  //confirm order number on confirmation page
  //POST request to server
  const thankYouHeader = await screen.findByRole('heading', {

    name: /thank you/i,

    
  });
  expect(thankYouHeader).toBeInTheDocument();

  //expect that loading has disapeared 
  const notLoading  = screen.queryByText('loading');
  expect(notLoading).not.toBeInTheDocument();

  //display order number, check by only text in Document
  const orderNumber = await Screen.findByText(/order orderNumber/i);
  expect(orderNumber).toBeInTheDocument();

  //find and click "new order" button on confirmation page

  const newOrderButton = screen.getByRole(('button'), {name: /new order/i });
  userEvent.click(newOrderButton);

  //on order entry page,we check that scoops and topping have been Reset
  const scoopsTotal = screen.getByTest('Scoops total: $0.00');
  expect(scoopsTotal).toBeInTheDocument;
  const ToppingsTotal = screen.getByText('Scoops total: $0.00');
  expect(toppiingsTotal).toBeInTheDocument;


  //wait for items to appear
  //helps to avoid errors
  await screen.findByRole('spinbutton', {name: 'Vanilla'});
  await screen.findByRole('checkbox', {name: 'Cherries'});

});

/////////////////////



test('Topping header is not on summary page if no toppings ordered', async()=>{
  render(<App />);

  //add ice cream scoops and toppings
  const vanillaInput = await screen.findByRole('spinbutton',{
  name: 'vanilla',

  });

  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '1');

    const chocolateInput = screen.getByRole('spinbutton', {
    name: 'chocolate',
  });
 
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, '2');

  //find and click order summary button
  const orderSummaryButtom = screen.getByRole('button', {
   name: /order sundae/i,

  });
  userEvent.click(orderSummaryButtom);

  const scoopheading = screen.getByRole('heading', {name: 'Scoops: $6.00' })
  expect(scoopheading).toBeInTheDocument();

  const toppingsHeading = screen.queryByRole('heading', {name: /toppings/i})
  expect(toppingsHeading).not.toBeInTheDocument();
  

});//end of test 2

test('disable order button if there are no scoops ordered', async() =>{
  render(<OrderEntry setOrderPhase={jest.fn()} />);

//order Button should be disabled at first, even before options load
let orderButton = screen.getByRole('button', {name: /order sundae/i});
expect(orderButton).toBeDisabled();

//expect button to be enables after adding scoop
const vanillaInput = await screen.findByRole('spinbutton', {
name: 'vanilla',

});

userEvent.clear(vanillaInput);
userEvent.type(vanillaInput, '1');
expect(orderButton).toBeEnabled();

//expect button to be disabled again after removing scoop
userEvent.clear(vanillaInput);
userEvent.type(vanillaInput, '0');
expert(orderButton).toBeDisabled();



});//end test 3



test.only('indicate if scoop count is non-int or out of range',async()=>{
  render(<ScoopOption name="" imagePath="" updateItemCount={jest.fn()} />);

  //expect input tobe invalid with negative number
  const vanillaIput = screen.getByRole('spinbutton');
  userEvent.clear(vanillaIput);
  userEvent.type(vanillaIput, '-1');
  expect(vanillaInput).toHaveClass('is-invalid');

  //replace with decimal input
  userEvent.clear(vanillaIput);
  userEvent.type(vanillaIput, '2.5');
  expect(vanillaIput).toHaveClass('is-invaild');

  //replace with input thats too high
  userEvent.clear(vanillaIput);
  userEvent.type(vanillaIput, '11');
  expect(vanillaIput).toHaveClass('is-invaild');

  //replace with valid imnput
  userEvent.clear(vanillaIput);
  userEvent.type(vanillaIput, '3');
  expect(vanillaIput).not.toHaveClass('is-invaild');

});//end test 4

