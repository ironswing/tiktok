<?php

namespace App\Http\Controllers;

use App\Note;
use \Exception;
use Illuminate\Http\Request;
use App\Services\CertificateService;

class NoteController extends Controller
{
    //
    public function addNote(Request $request, CertificateService $certificateService){
        $user_id = $certificateService->verifyLogin($request);

        // content 参数
        $content = trim($request->input("content"));

        $offset_x = $request->input("offset_x");

        $offset_y = $request->input("offset_y");

        if (empty($content)) {

            throw new Exception("填写不完整！");
        }

        $id = (new Note())->addMyNote($user_id, $content, $offset_x, $offset_y);

        return ["data" => ["id" => $id]];
    }

    public function editNote(Request $request, CertificateService $certificateService) {

    }

    public function getNotes(Request $request, CertificateService $certificateService)
    {
        $user_id = $certificateService->verifyLogin($request);

        $notes = (new Note())->getUserNotes($user_id);
        return ["data" => $notes];
    }

    public function deleteNoteById($id, Request $request, CertificateService $certificateService){

        (new Note())->newQuery()->where(["id" => $id])->update(["status" => 0]);

        return [
            "data" => ["id" => $id],
            "msg" => "删除成功！"
        ];
    }

    public function getDetail($id, Request $request, CertificateService $certificateService)
    {
        $data = Note::where("id", $id)->first();
        return ["data" => $data];
    }
}
