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
    const accountsList = this.element.getElementsByTagName('select')[0];
    accountsList.innerHTML = '';

    Account.list(User.fetch((err,response) => response.user), (err, response) => {
      if(response.success) {
        response.data.forEach(acc => accountsList.insertAdjacentHTML('beforeend', 
        `<option value="${acc.id}">${acc.name}</option>`))
      }
    });
}

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    Transaction.create(data, (err, response) => {
      if(response && response.success) {
        this.element.reset();
        if(data.type == 'income') {
          App.getModal('newIncome').close();
        } else App.getModal('newExpense').close();
        App.update();
      } 
    });
  }
    /*Transaction.create(data, (err , response) => {
      if (response && response.success) {
        this.element.reset();
        App.getModal('new' + type[0].toUpperCase() + type.slice(1)).close();
        App.update();
      }
    });
  };*/
};