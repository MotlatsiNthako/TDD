import { render, screen} from '@testing-library/react';
import userEvent from '@testing-library-event';
import Options from '../Options';

test('update scoop subtotal when scoops change', () => {

    render(<Options optionType="scoops" />);

//make sure total starts out $0.00

  const scoopSubtotal = screen.getByText('Scoops total: $', {exact: false});
  expect(scoopsSubtotal).toHaveTextContent('0.00');


//update vanilla scoops to 1 and check the subtotal

const vanillaInput = await screen.findByRole('spinbutton', {
     name: 'Vanilla',

    });

    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '1');
    expect(scoopsSubtotal).toHaveTextContent('2.00');

//update chocolate scoops to 2 and check subtotal

const chocolateInput = await screen.findByRole('spinbutton', {

    name: 'Chocolate',
});

userEvent.clear(chocolateInput);
userEvent.type(chocolateInput, '2');
expect(scoopsSubtotal).toHaveTextContent('6.00');
});