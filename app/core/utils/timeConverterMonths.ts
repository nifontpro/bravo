export const timeConverterMonth = (UNIX_timestamp: number | undefined): string => {
  if (UNIX_timestamp != undefined) {
    let a = new Date(UNIX_timestamp);
    let months = [
      'Январь',
      'Февраль',
      'Март',
      'Апрель',
      'Май',
      'Июнь',
      'Июль',
      'Август',
      'Сенятбрь',
      'Октябрь',
      'Ноябрь',
      'Декабрь',
    ];

    let month = months[a.getMonth()];
   
    return month
  } else {
    return ''
  }
};
