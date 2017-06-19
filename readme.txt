componentDidMount(){
  axios({
    method: 'get',
    url: 'https://api.twitch.tv/kraken/streams/',
    dataType: 'json',
    stream_type: 'live',
    limit: 5,
    headers: {
      'Client-ID': 'duecfq1es6f5rgg0bxny2jgir00ggz'
    },
    success: (response) => {
      status = response.stream.channel.status;
      online = true;
      icon = response.stream.channel.logo;
      user = response.stream.channel.display_name;
      game = response.streams.channel.game,
      url = response.streams.channel.url,
      views = response.streams.channel.views,
    });
    this.setState({
      icon: icon,
      user: user,
      status: status,
      game: game,
      url: url,
      views: views
    });
  });
}
