package com.example.ft.controller;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.minidev.json.JSONArray;
import net.minidev.json.JSONObject;
import netscape.javascript.JSObject;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import com.example.ft.entity.Board;
import com.example.ft.service.BoardService;
import org.springframework.web.bind.annotation.RequestBody;




@Slf4j  //log로 값을 출력
@Controller   // 이건 Controller 꼭 필요한 기능
@RequestMapping("/board") // localhost:8090/ft/board  식으로 오게 하는것
@RequiredArgsConstructor  // final을 사용하려면 필요
public class BoardController {
	private final BoardService boardService; 
	
	@GetMapping("/list")
	public JSONArray list(String btype) {
		List<Board> list = boardService.getBoardList(btype);
		if(btype.equals("reveiew")) {
			
		}
		JSONArray jArr = new JSONArray();          
		for(Board board : list) {
			JSONObject jObj = new JSONObject();
			jObj.put("bid",board.getBid());
			jObj.put("iId",board.getIId());
			jObj.put("email",board.getEmail());
			jObj.put("btype",board.getBtype());
			jObj.put("bcate",board.getBcate());
			jObj.put("title",board.getTitle());
			jObj.put("bdate",board.getBdate());
			jObj.put("content",board.getContent());
			jObj.put("img",board.getImg());
			jArr.add(jObj);
		}
		return jArr;
	}
	@PostMapping("/insert")
	public String boardinsert(int iId, String email, String btype, String bcate,
			String title, String content, String img) {
		Board board =Board.builder()
				  		.iId(iId).email(email).btype(btype).bcate(bcate)
				  		.title(title).content(content).img(img).build();
		boardService.insertBoard(board);
		
		return "등록되었습니다.";
	}
	

}
