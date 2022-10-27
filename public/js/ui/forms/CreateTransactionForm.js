/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element)

    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    Account.list(null, (err, response) => { 
      if (response && response.success) { 
        if (this.element.id === 'new-income-form') { 
          let select = this.element.querySelector('.accounts-select');
          select.innerHTML = response.data.reduce((newArr, currentValue) => {
          newArr.push(`<option value="${currentValue.id}">${currentValue.name}</option>`);
          return newArr;
    }, []);
  }
      if (this.element.id === 'new-expense-form') { 
        let select = this.element.querySelector('.accounts-select');
        select.innerHTML = response.data.reduce((newArr, currentValue) => {
        newArr.push(`<option value="${currentValue.id}">${currentValue.name}</option>`);
        return newArr;
    }, []);
  }
}
    });
};

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    Transaction.create(data, (err , response) => {
      if (response && response.success) {
        this.element.reset();
        App.getModal('new' + type[0].toUpperCase() + type.slice(1)).close();
        //new Modal(this.element.closest('.modal')).close();
        App.update();
      }
    });
  };
};