package com.example.ft.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.ft.dao.BoardDao;
import com.example.ft.entity.Board;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor   // 서비스처럼 사용 가능
public class BoardServiceImpl implements BoardService{
	private final BoardDao boardDao;
	
	@Override
	public Board getBoardByBid(int bid) {
		
		return boardDao.getBoardByBid(bid);
	}

	@Override
	public List<Board> getBoardList(String btype) {
		
		return boardDao.getBoardList(btype);
	}

	@Override
	public void insertBoard(Board board) {
		boardDao.insertBoard(board);
	}

	@Override
	public void updateBoard(Board board) {
		boardDao.updateBoard(board);
		
	}

	@Override
	public void deleteBoard(int bid) {
		boardDao.deleteBoard(bid);
		
	}

}
