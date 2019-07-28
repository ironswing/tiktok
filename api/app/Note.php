<?php

namespace App;

use App\Services\TimeService;
use Illuminate\Database\Eloquent\Model;

class Note extends Model
{
    protected $table = 'notes';

    //
    public function addMyNote($user_id, $content, $offset_x, $offset_y){

        $timeService = new TimeService();

        $data = [

            "user_id" => $user_id,
            "content" => $content,
            "offset_x" => $offset_x,
            "offset_y" => $offset_y,
            "created_at" =>$timeService->getDatetime(),
            "updated_at" =>$timeService->getDatetime(),
        ];

        return $this->newQuery()->insertGetId($data);
    }

    public function editNote($user_id, $content){

        $timeService = new TimeService();


        $data = [
            "user_id" => $user_id,
            "content" => $content,

            "updated_at" =>$timeService->getDatetime(),
        ];

        $this->newQuery()->where(["id"=>$user_id])->update($data);
    }

    public function getUserNotes($user_id)
    {
        $notes = collect($this->newQuery()->where(['user_id' => $user_id, 'status' => 1])->orderByDesc("id")
            ->paginate(10));

        return $notes;
    }

    public function deleteNote($id)
    {
        $note = new Note();

        $note->newQuery()->where(["id" => $id])->update(["status" => 0]);

        return;
    }
}
