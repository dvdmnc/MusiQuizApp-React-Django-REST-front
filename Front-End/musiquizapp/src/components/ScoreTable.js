import React from 'react'

function ScoreTable({score}) {
  return (
    <table id ="scoretable">
        <thead>
            <tr>
                <th>Equipe</th>
                <th>Score</th>
            </tr>
        </thead>
        <tbody>
            {score.map((sco,index) =>
                <tr key={index}>
                    <td>
                        Equipe {index+1}
                    </td>
                    <td>
                        {sco}
                    </td>
                </tr>
            )
        }
        </tbody>
    </table>
  )
}

export default ScoreTable