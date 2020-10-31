import moment from 'moment'

export const getDateTimeArrayIndo = dateTimeString => {
  const dateTime = new Date(dateTimeString);
  const day = [
    "Minggu",
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jum'at",
    "Sabtu",
  ];
  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember"
  ];

  const date = `${day[dateTime.getDay()]}, ${dateTime.getDate()} ${months[dateTime.getMonth()]
    } ${dateTime.getFullYear()}, `;
  const time = dateTime
    .toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: false
    })
    .toLowerCase();
  return [date, moment(time).format("HH:mm")];
}

export const convertWeather = weather => {
  const listWeather = [
    {
      weather: "clear sky",
      result: "Cerah"
    },
    {
      weather: "few clouds",
      result: "Sedikit berawan"
    },
    {
      weather: "scattered clouds",
      result: "Berawan"
    },
    {
      weather: "broken clouds",
      result: "Mendung"
    },
    {
      weather: "shower rain",
      result: "Rintis"
    },
    {
      weather: "rain",
      result: "Hujan"
    },
    {
      weather: "thunderstorm",
      result: "Petir"
    },
    {
      weather: "snow",
      result: "Bersalju"
    },
    {
      weather: "mist",
      result: "Berkabut"
    },
  ]
  const result = listWeather.filter(row => row.weather === weather).map(row=>row.result).toString()
  return result
}