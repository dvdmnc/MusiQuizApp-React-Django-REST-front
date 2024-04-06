import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Game from '../pages/Game';

// Mocking the useLocation hook to provide a predefined set array
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useLocation: () => ({
        state: {
            set: ['Jeu en équipe', 3, 1] //We define the type of game, the number of teams and the timer (in minutes) for each round
        }
    })
}));


beforeEach(() => { //Mocking data fetching
    global.fetch = jest.fn().mockResolvedValue({
      json: () =>
        Promise.resolve([
          [
            "Hey Jude",
            "Armstrong",
            "Douce France"],
          {
          "Beatles": "http://127.0.0.1:8000/media/images/beatles_cOWkXUF_WyR1O9I.png",
          "Claude Nougaro": "http://127.0.0.1:8000/media/images/claude_nougaro_A4LGXPq.jpg",
          "Charles Trenet": "http://127.0.0.1:8000/media/images/Charles_Trenet_R29w345.jpg",
        }, 
          {
            "Beatles": [
                "Hey Jude",
                "Let it be",
                "Yesterday"
            ],
            "Claude Nougaro": [
                "Armstrong",
                "Cécile",
                "Tu verras"
            ],
            "Charles Trenet": [
                "Douce France",
                "Que reste t-il de nos amours",
                "Je Chante"
            ]
        },
        {"Hey Jude": "https://res.cloudinary.com/dqfbd0pnv/video/upload/v173173991/samples/fjnjpr4hrqk4ar2sz38w.flac",
        "Armstrong": "https://res.cloudinary.com/dqfbd0pnv/video/upload/v173173989/samples/saenlsqpfg1omaya4v3s.mp3",
        "Douce France": "https://res.cloudinary.com/dqfbd0pnv/video/upload/v173173978/samples/etx6zzega2q8p21qurfg.mp3"}
        ])
    });
  });
  
  afterEach(() => {
    global.fetch.mockClear();
  });


describe('Game component',() => {

        describe('Fetch Data and Display', () => {
            it('Correctly displays 3 songs', async () => {
                const { container } = render(<BrowserRouter><Game /></BrowserRouter>); //We have to wrap the component in a router because of useLocation() that can be used only in react router dom
                await waitFor(() => {
                    const songs = container.querySelectorAll('.songlink');
                    expect(songs).toHaveLength(3);
                });
            });

            it('Correctly displays 3 singer\'s names', async () => {
                const { container } = render(<BrowserRouter><Game /></BrowserRouter>);
                await waitFor(() => {
                    const singerNames = container.querySelectorAll('.namelink');
                    expect(singerNames).toHaveLength(3);
                });
            });

            it('Correctly displays 3 singer\'s faces', async () => {
                const { container } = render(<BrowserRouter><Game /></BrowserRouter>);
                await waitFor(() => {
                    const singerFaces = container.querySelectorAll('.facelink');
                    expect(singerFaces).toHaveLength(3);
                });
            });

            it('Correctly displays 3 samples', async () => {
                const { container } = render(<BrowserRouter><Game /></BrowserRouter>);
                await waitFor(() => {
                    const samples = container.querySelectorAll('.listendisplay');
                    expect(samples).toHaveLength(3);
                });
            });
        })

        describe('Link validity and points counting', () => {
            it('Correctly link song and singer and add one point', async() => {
                const { getByText } = render(<BrowserRouter><Game /></BrowserRouter>);
                window.alert = () => {}
                HTMLMediaElement.prototype.pause = () => {} //These two needs to be implemented as empty because the jest browser don't have them. Otherwise i gt an error
                await waitFor(() => {
                    const song = getByText("Hey Jude", { selector: '.songlink' });
                    fireEvent.click(song)

                    const singer = getByText("Beatles", { selector: '.namelink' });
                    fireEvent.click(singer)

                    const team = getByText("Equipe 1")
                    const teamScore = Number(team.nextElementSibling.textContent)
                    expect(teamScore).toEqual(1)
                })
            })
            it('Correctly link song and sample and add one point', async() => {
                const { getByText, container } = render(<BrowserRouter><Game /></BrowserRouter>);
                window.alert = () => {}
                HTMLMediaElement.prototype.pause = () => {} //These two needs to be implemented as empty because the jest browser don't have them. Otherwise i gt an error
                await waitFor(() => {
                    const song = getByText("Hey Jude", { selector: '.songlink' });
                    fireEvent.click(song)

                    const audio = container.querySelector(`audio[src="https://res.cloudinary.com/dqfbd0pnv/video/upload/v173173991/samples/fjnjpr4hrqk4ar2sz38w.flac"]`);
                    const audioButton = audio.previousElementSibling
                    fireEvent.click(audioButton)

                    const team = getByText("Equipe 1")
                    const teamScore = Number(team.nextElementSibling.textContent)
                    expect(teamScore).toEqual(2)
                })
            })
            it('Correctly link singer and face and add one point', async() => {
                const { getByText, container } = render(<BrowserRouter><Game /></BrowserRouter>);
                window.alert = () => {}
                HTMLMediaElement.prototype.pause = () => {} //These two needs to be implemented as empty because the jest browser don't have them. Otherwise i gt an error
                await waitFor(() => {
                     const singer = getByText("Beatles", { selector: '.namelink' });
                    fireEvent.click(singer)

                    const face = container.querySelector(`img[src="http://127.0.0.1:8000/media/images/beatles_cOWkXUF_WyR1O9I.png"]`);
                    const faceButton = face.parentNode
                    fireEvent.click(faceButton)

                    const team = getByText("Equipe 1")
                    const teamScore = Number(team.nextElementSibling.textContent)
                    expect(teamScore).toEqual(3)
                })
            })
        })

        describe("Play, Pause and Next button work fine",() => {
            it("Pause button stops the countdown", async () => {
                const { getByText, getByTestId } = render(<BrowserRouter><Game /></BrowserRouter>);
                    const pauseButton = getByText('Pause')
                    fireEvent.click(pauseButton)
                    await waitFor(() => { //Otherwise jest doesn't find the timer, i guess because it's not loaded yet
                    const timerBefore = getByTestId('timer').textContent
                    setTimeout(() => {
                        const timerAfter = getByTestId('timer').textContent
                        expect(timerBefore).toEqual(timerAfter)
                    },1000)
                })
            })
            it("Play button restarts the timer", async () => {
                const { getByText, getByTestId } = render(<BrowserRouter><Game /></BrowserRouter>);
                const playButton = getByText('Play')
                await waitFor(() => { //Otherwise jest doesn't find the timer, i guess because it's not loaded yet
                const timerBefore = getByTestId('timer').textContent
                fireEvent.click(playButton)
                setTimeout(() => {
                    const timerAfter = getByTestId('timer').textContent
                    expect(timerBefore).not.toEqual(timerAfter)
                },1000)
            })
            })
            it('Next button appears at the end of the timer and we can\'t score points anymore', async() => {
                const {getByText, container} = render(<BrowserRouter><Game /></BrowserRouter>);
                const alertSpy = jest.spyOn(window, 'alert') //To check if 
                await waitFor(() => {
                    setTimeout(() => {
                        const nextButton = getByText('Suivant')
                        expect(nextButton).toBeInTheDocument()

                        const song = getByText("Hey Jude", { selector: '.songlink' });
                        fireEvent.click(song)

                        expect(alertSpy).toHaveBeenCalledTimes();
                        expect(alertSpy).toHaveBeenCalledWith('Fin du tour');

                        const singer = getByText("Beatles", { selector: '.namelink' });
                        fireEvent.click(singer)

                        expect(alertSpy).toHaveBeenCalledTimes();
                        expect(alertSpy).toHaveBeenCalledWith('Fin du tour');

                        const face = container.querySelector(`img[src="http://127.0.0.1:8000/media/images/beatles_cOWkXUF_WyR1O9I.png"]`);
                        const faceButton = face.parentNode
                        fireEvent.click(faceButton)

                        expect(alertSpy).toHaveBeenCalledTimes();
                        expect(alertSpy).toHaveBeenCalledWith('Fin du tour');

                        const audio = container.querySelector(`audio[src="https://res.cloudinary.com/dqfbd0pnv/video/upload/v173173991/samples/fjnjpr4hrqk4ar2sz38w.flac"]`);
                        const audioButton = audio.previousElementSibling
                        fireEvent.click(audioButton)

                        expect(alertSpy).toHaveBeenCalledTimes();
                        expect(alertSpy).toHaveBeenCalledWith('Fin du tour');

                    },60000) //1 minute (we defined it at the beginning of the file with the state of useLocation())
                })
            })
        })
})